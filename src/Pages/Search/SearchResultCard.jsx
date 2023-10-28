import { useState } from "react";
import { FaCoins, FaMapPin } from "react-icons/fa";
import SearchCardCarousel from "./SearchCardCarousel";
import SearchModal from "./SearchModal";
import { IMAGE_STORAGE_PATH } from "../../constants/General";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserID } from "../../redux/selectors";

export default function SearchResultCard({ supplier }) {
	const [modalOpen, setModalOpen] = useState(false);
	const userID = useSelector(getUserID);

	const openModal = (e) => {
		e.stopPropagation();
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const lowestStartPrice = supplier.services.reduce((lowest, service) => {
		return Math.min(
			lowest,
			...service.subcategories.map((subcategory) =>
				parseFloat(subcategory.startPrice)
			)
		);
	}, Infinity);

	const highestEndPrice = supplier.services.reduce((highest, service) => {
		return Math.max(
			highest,
			...service.subcategories.map((subcategory) =>
				parseFloat(subcategory.endPrice)
			)
		);
	}, -Infinity);

	return (
		<>
			{/* h-90 w-60 md:w-80 */}
			<Link
				to={"/supplier/" + supplier.id}
				className="m-auto overflow-hidden rounded-lg shadow-lg h-full cursor-pointer w-full"
			>
				<a href="#" className="block w-full h-full bg-white">
					<div>
						<SearchCardCarousel
							images={supplier.images}
							supplier_id={supplier.id}
						/>
					</div>

					{/* <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg" className="object-cover w-full max-h-40" /> */}

					<div
						style={{ height: "calc(100% - 166px)" }}
						className="w-full p-4 pt-2 bg-white flex flex-col justify-between "
						sty
					>
						<div>
							<div className="flex items-center">
								<a href="#" className="relative block">
									<img
										alt="profil"
										src={
											supplier.avatar
												? IMAGE_STORAGE_PATH +
												  supplier.avatar
												: "./../../images/noavatar.svg"
										}
										className="mx-auto object-cover rounded-full h-10 w-10 "
									/>
								</a>
								<p className="text-gray-800 font-medium ml-4 ">
									{supplier.name}
								</p>
							</div>

							<div className="flex gap-1 mt-2 flex-wrap">
								{supplier.services.map((service) => (
									<span className="px-2 text-xs rounded-full text-gray-600 border border-gray-600 bg-gray-200 flex whitespace-nowrap">
										{service.category_name}
									</span>
								))}
							</div>
						</div>

						<div>
							<div className="flex flex-col gap-1 my-4 text-gray-600">
								<div className="flex gap-1 items-center">
									<FaMapPin />
									<span className="px-2 text-sm">
										{supplier.district_name}
									</span>
								</div>
								<div className="flex gap-1 items-center">
									<FaCoins />
									<span className="px-2 text-sm">
										Desde {lowestStartPrice.toFixed(2)}€ até{" "}
										{highestEndPrice.toFixed(2)}€
									</span>
								</div>
							</div>
							{!(userID == supplier.id) && (
								<button
									className=" px-6 py-2 transition ease-in duration-200 text-orange-500 uppercase rounded-md hover:bg-orange-400 hover:text-white border border-orange-400 focus:outline-none w-full"
									onClick={openModal}
								>
									Pedir informação
								</button>
							)}
						</div>
					</div>
				</a>
			</Link>
			{modalOpen && (
				<SearchModal
					closeModal={closeModal}
					supplier_id={supplier.id}
					supplier_name={supplier.name}
				/>
			)}
		</>
	);
}
