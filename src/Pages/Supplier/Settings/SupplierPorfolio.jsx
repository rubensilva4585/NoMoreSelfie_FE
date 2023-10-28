import React, { useEffect, useState } from "react";
import SupplierPorfolioFormImgUpload from "./SupplierPorfolioFormImgUpload";
import {
	IMAGE_STORAGE_PATH,
	IMAGE_TOTAL_MAX,
} from "../../../constants/General";
import { FaTrash } from "react-icons/fa";
import { getSupplierImages, removeSupplierImage } from "../../../API/User";
import toast from "react-hot-toast";

export default function SupplierPorfolio() {
	// states
	const [supplierImages, setSupplierImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	// consts
	const totalImages = supplierImages.length;

	const toastPromise = (imageId) =>
		toast.promise(
			removeSupplierImage(imageId)
				.then((data) => {
					setSupplierImages(
						supplierImages.filter((image) => image.id !== imageId)
					);
				})
				.finally(() => {
					setIsDeleting(false);
				}),
			{
				loading: "A apagar imagem...",
				success: <b>Imagem apagada com sucesso!</b>,
				error: <b>Erro ao apagar imagem!</b>,
			}
		);

	// functions
	const handleDeteleImage = (imageId) => {
		setIsDeleting(true);
		toastPromise(imageId);
		// removeSupplierImage(imageId)
		//         .then((data) => {
		//                 setSupplierImages(supplierImages.filter((image) => image.id !== imageId));
		//         }).catch(error => {
		//                 alert("Erro ao apagar imagem: " + error);
		//         }).finally(() => {
		//                 setIsDeleting(false);
		//         });
	};

	const handleGetImages = () => {
		getSupplierImages()
			.then((data) => {
				setSupplierImages(data);
			})
			.catch((error) => {
				alert("Erro ao carregar imagens: " + error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// effects
	useEffect(() => {
		const abortController = new AbortController();

		handleGetImages();

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<section className=" bg-gray-100/50 ">
			<div className="container max-w-6xl mx-auto sm:px-3 md:px-12 pb-16">
				{isLoading ? (
					<>
						<div className="h-64 flex items-center justify-center">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
						</div>
					</>
				) : (
					<>
						<div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
							<div className="items-center w-full p-8 space-y-4 text-gray-500 md:space-y-0">
								<div className="flex items-end justify-between">
									<div>
										<h3 className="text-gray-800 text-bold text-xl">
											Portfolio
										</h3>
										<span className="text-sm">
											Chame a atenção dos compradores
											certos com exemplos visuais dos seus
											serviços.
										</span>
									</div>
									<div>
										({totalImages}/{IMAGE_TOTAL_MAX})
									</div>
								</div>

								<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
									{supplierImages &&
										supplierImages.map((image) => (
											<div
												key={image.id}
												className="hover:relative h-60 w-full overflow-hidden"
											>
												<img
													className="h-full w-full object-cover rounded-lg"
													src={
														IMAGE_STORAGE_PATH +
														image.path
													}
													alt=""
												/>
												<div
													className="absolute top-2 right-2 cursor-pointer bg-opacity-50 bg-white p-2 rounded-full hover:bg-red-500 hover:text-white"
													onClick={() =>
														!isDeleting &&
														handleDeteleImage(
															image.id
														)
													}
												>
													{isDeleting ? (
														<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-400 bg-gray-100/50" />
													) : (
														<FaTrash />
													)}
												</div>
											</div>
										))}
									<SupplierPorfolioFormImgUpload
										totalImages={totalImages}
										handleGetImages={handleGetImages}
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
