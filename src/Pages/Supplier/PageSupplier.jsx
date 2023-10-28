import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	FaFacebook,
	FaInstagram,
	FaLink,
	FaLinkedin,
	FaMapPin,
	FaPinterest,
} from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import PageSupplierService from "./PageSupplierService";
import {
	getSupplierDistrictsById,
	getSupplierImagesById,
	getSupplierServicesById,
	getUserById,
} from "../../API/General";
import {
	IMAGE_STORAGE_PATH,
	ROLE_ADMIN,
	ROLE_SUPPLIER,
} from "../../constants/General";
import SearchModal from "../Search/SearchModal";
import {
	addUserFavorites,
	removeUserFavorites,
	getUserFavorites,
} from "../../API/User";
import { getUserID, getUserRole, getUserToken } from "./../../redux/selectors";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PageSupplier() {
	const [supplierData, setSupplierData] = useState(null);
	const [supplierServicesData, setSupplierServicesData] = useState(null);
	const [supplierDistricts, setSupplierDistricts] = useState(null);
	const [supplierImages, setSupplierImages] = useState([
		{
			original: "../../../images/noimage.png",
			thumbnail: "../../../images/noimage.png",
		},
	]);
	const [modalOpen, setModalOpen] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const { supplier_id } = useParams();
	const userToken = useSelector(getUserToken);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const userRole = useSelector(getUserRole);
	const userID = useSelector(getUserID);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleLike = () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		if (isLiked) {
			removeUserFavorites(supplier_id)
				.then((response) => {
					toast.success("Removido dos favoritos!");
					setIsLiked(!isLiked);
				})
				.catch((error) => {
					toast.error("Erro ao remover dos favoritos!");
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		} else {
			addUserFavorites(supplier_id)
				.then((response) => {
					toast.success("Adicionado aos favoritos!");
					setIsLiked(!isLiked);
				})
				.catch((error) => {
					toast.error("Erro ao adicionar aos favoritos.");
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		getUserById(supplier_id)
			.then((data) => {
				if (data.role != ROLE_SUPPLIER) {
					window.location.replace("/error404");
					return;
				}
				if (!data.isVerified) {
					if (!(userRole == ROLE_ADMIN || userID == data.id))
						window.location.replace("/error404");
				}
				setSupplierData(data);
			})
			.catch((error) => {
				window.location.replace("/error404");
			});

		getSupplierImagesById(supplier_id)
			.then((data) => {
				data.length > 0 &&
					setSupplierImages(
						data.map((image) => {
							return {
								original: IMAGE_STORAGE_PATH + image.path,
								thumbnail: IMAGE_STORAGE_PATH + image.path,
							};
						})
					);
			})
			.catch((error) => {
				throw error;
			});

		getSupplierServicesById(supplier_id)
			.then((data) => {
				setSupplierServicesData(data);
			})
			.catch((error) => {
				throw error;
			});

		getSupplierDistrictsById(supplier_id)
			.then((data) => {
				setSupplierDistricts(data);
			})
			.catch((error) => {
				throw error;
			});

		if (userToken != null) {
			getUserFavorites()
				.then((response) => {
					const favorites = response;
					const isLiked = favorites.some(
						(favorite) => favorite.id == supplier_id
					);
					setIsLiked(isLiked);
				})
				.catch((error) => {
					toast.error("Ocorreu um problema.");
				});
		}

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<section className=" bg-gray-100/50">
			{!(
				supplierData &&
				supplierImages &&
				supplierServicesData &&
				supplierDistricts
			) ? (
				<>
					<div className="h-screen flex items-center justify-center">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
					</div>
				</>
			) : (
				<>
					{!supplierData.isVerified && (
						<div className="bg-orange-500 text-white text-center py-8">
							<p className="text-xl font-semibold mt-2">
								Esta conta ainda não foi verificada.
							</p>
						</div>
					)}
					<div className="container mx-auto px-3 md:px-12 py-20 flex flex-col lg:grid lg:grid-cols-3 gap-8">
						<div className="rounded-lg lg:block lg:col-span-2 h-100">
							<ImageGallery
								items={supplierImages}
								infinite={true}
								showBullets={true}
								showFullscreenButton={true}
								useBrowserFullscreen={true}
								showPlayButton={true}
								showThumbnails={true}
								showIndex={true}
								showNav={true}
								thumbnailPosition={"bottom"}
								slideDuration={parseInt(500)}
								slideInterval={parseInt(2000)}
								slideOnThumbnailOver={true}
								useWindowKeyDown={true}
							/>
							<hr className="my-8" />
							{/* Descricao */}
							<div className="bg-white rounded-lg p-5 shadow-lg border border-gray-200">
								<div className=" ">
									<h1 className="text-2xl font-bold text-gray-800 mb-4">
										Descrição
									</h1>
									<div
										id="service_description"
										className="text-gray-600 prose"
										dangerouslySetInnerHTML={{
											__html:
												supplierData &&
												supplierData.service_description,
										}}
									></div>
								</div>

								<hr className="my-8" />
								{/* Distritos */}
								<div className="">
									<h1 className="text-2xl font-bold text-gray-800 mb-4">
										Distritos
									</h1>
									<div
										id="service_districts"
										className="text-gray-600 w-full flex overflow-x-auto items-center text-lg rounded-lg p-2 bg-gray-100/50"
									>
										{supplierDistricts.map(
											(district, index) => {
												return (
													<>
														<div
															key={index}
															className=""
														>
															{district.name}
														</div>
														{index <
															supplierDistricts.length -
																1 && (
															<div className="mx-4 text-gray-600">
																|
															</div>
														)}
													</>
												);
											}
										)}
									</div>
								</div>

								<hr className="my-8" />

								{/* Servicos e Precos */}
								<div className="">
									<h1 className="text-2xl font-bold text-gray-800 mb-4">
										Serviços e Preços
									</h1>
									<div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
										{supplierServicesData &&
											supplierServicesData.map(
												(service, index) => {
													return (
														<PageSupplierService
															key={index}
															service={service}
														/>
													);
												}
											)}
									</div>
								</div>
							</div>
						</div>

						<div className="order-first lg:order-none lg:col-span-1">
							<div className="p-4 bg-white shadow-lg rounded-2xl space-y-6">
								<div className="text-center my-4">
									<div className="h-32 w-32 rounded-full border-2 p-1 border-orange-400 mx-auto my-2 overflow-hidden">
										<img
											className="object-cover w-full h-full rounded-full"
											src={
												supplierData &&
												supplierData.avatar
													? IMAGE_STORAGE_PATH +
													  supplierData.avatar
													: "./../../images/noavatar.svg"
											}
											alt=""
										/>
									</div>

									<div className="mb-2">
										<h3 className="font-bold text-3xl text-gray-800">
											{supplierData && supplierData.name}
										</h3>
										{supplierData &&
											supplierData.district && (
												<div className="inline-flex text-gray-700 items-center">
													<svg
														className="h-4 w-4 text-gray-400 mr-1"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
													>
														<path
															className=""
															d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
														/>
													</svg>
													{supplierData &&
														supplierData.district
															.name}
												</div>
											)}
									</div>
									<div className="h-1 w-10 bg-orange-400 mx-auto" />
								</div>
								<div>
									<p className="text-gray-600 text-center">
										{supplierData && supplierData.bio}
									</p>
								</div>

								<div className="flex items-center justify-around text-xs text-gray-400">
									<p className="flex text-center flex-col">
										Email
										<span className="font-bold text-center text-black">
											{supplierData && supplierData.email}
										</span>
									</p>
									<p className="flex text-center flex-col">
										Telefone
										<span className="font-bold text-center text-black">
											{supplierData && supplierData.phone}
										</span>
									</p>
								</div>
								<div className="flex items-center gap-2 justify-between w-40 pt-4 mx-auto text-gray-500 border-t border-gray-200 text-3xl">
									{supplierData && supplierData.social && (
										<>
											{supplierData.social.facebook && (
												<a
													href={`https://facebook.com/${supplierData.social.facebook}`}
													target="_blank"
												>
													<FaFacebook />
												</a>
											)}

											{supplierData.social.instagram && (
												<a
													href={`https://instagram.com/${supplierData.social.instagram}`}
													target="_blank"
												>
													<FaInstagram />
												</a>
											)}

											{supplierData.social.pinterest && (
												<a
													href={`https://pinterest.com/${supplierData.social.pinterest}`}
													target="_blank"
												>
													<FaPinterest />
												</a>
											)}

											{supplierData.social.linkedin && (
												<a
													href={`https://linkedin.com/in/${supplierData.social.linkedin}`}
													target="_blank"
												>
													<FaLinkedin />
												</a>
											)}

											{supplierData.social.website && (
												<a
													href={`https://${supplierData.social.website}`}
													target="_blank"
												>
													<FaLink />
												</a>
											)}
										</>
									)}
								</div>

								<div className="flex items-center justify-between gap-4 mt-6">
									{!(
										userID == supplierData.id ||
										!supplierData.isVerified
									) && (
										<>
											<button
												className="py-2 transition ease-in duration-200 text-orange-500 uppercase rounded-md hover:bg-orange-400 hover:text-white border border-orange-400 focus:outline-none w-full"
												onClick={openModal}
											>
												Pedir informação
											</button>

											<button
												type="button"
												className="w-fit px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 transition duration-200 "
												onClick={handleLike}
											>
												{isLiked ? (
													<AiFillHeart
														className={`text-orange-400  drop-shadow-md text-2xl transition duration-200 ease-in-out `}
													/>
												) : (
													<AiOutlineHeart
														className={`text-orange-400  drop-shadow-md text-2xl transition duration-200 ease-in-out `}
													/>
												)}
											</button>
										</>
									)}
									{modalOpen && (
										<SearchModal
											closeModal={closeModal}
											supplier_id={supplier_id}
											supplier_name={supplierData.name}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
}
