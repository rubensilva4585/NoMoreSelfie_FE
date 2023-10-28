import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import { IMAGE_TOTAL_MAX } from "../../../constants/General";
import { uploadSupplierImages } from "../../../API/User";
import toast from "react-hot-toast";

export default function SupplierPorfolioFormImgUpload({
	totalImages,
	handleGetImages,
}) {
	// states
	const [isLoading, setIsLoading] = useState(false);

	// functions
	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/png, image/jpeg, image/jpg",
		onDrop: (acceptedFiles) => {
			setIsLoading(true);
			const imageFiles = acceptedFiles.filter((file) =>
				file.type.startsWith("image/")
			);

			handleFileUpload(imageFiles);
		},
	});

	const toastPromise = (imageFiles) =>
		toast.promise(
			uploadSupplierImages(imageFiles)
				.then((response) => {
					if (response.status === 201) {
						return handleGetImages();
					} else {
						throw new Error(
							"Falha no upload. Por favor, tente novamente."
						);
					}
				})
				.finally(() => {
					setIsLoading(false);
				}),
			{
				loading: "A adicionar imagem...",
				success: <b>Imagem adicionada com sucesso!</b>,
				error: <b>Erro ao adicionar imagem!</b>,
			}
		);

	const handleFileUpload = (imageFiles) => {
		setIsLoading(true);
		try {
			if (imageFiles.length === 0)
				throw new Error(
					"Por favor, selecione um ou mais arquivos válidos (png, jpeg, jpg)."
				);

			if (totalImages + imageFiles.length > IMAGE_TOTAL_MAX)
				throw new Error(
					`Limite de imagens atingido (${
						totalImages + imageFiles.length
					}/${IMAGE_TOTAL_MAX})`
				);
		} catch (error) {
			toast.error("Erro ao adicionar imagem.");
			setIsLoading(false);
			return;
		}
		toastPromise(imageFiles);
	};

	return (
		<div className="h-60 w-full flex justify-center items-center border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer">
			{isLoading ? (
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50" />
			) : !totalImages >= IMAGE_TOTAL_MAX ? (
				<p>Limite de {IMAGE_TOTAL_MAX} imagens atingido.</p>
			) : (
				<div
					{...getRootProps()}
					className="flex flex-col gap-4 justify-center items-center h-full"
				>
					<input {...getInputProps()} />
					<FaPlus className="text-gray-400 text-4xl" />
					<p>
						Arraste e solte ou clique aqui para adicionar imagens. (
						{totalImages}/{IMAGE_TOTAL_MAX})
					</p>
				</div>
			)}
		</div>
	);
}
