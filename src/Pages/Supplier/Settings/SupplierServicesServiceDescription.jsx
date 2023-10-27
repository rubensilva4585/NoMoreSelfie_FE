import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { ServiceDescription } from './ServicesDescription';
import { getUser, updateUser } from "../../../API/User";

export function SupplierServicesServiceDescription() {
	const reactQuillRef = useRef(null);
	const [sDescription, setSDescription] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmiting, setIsSubmiting] = useState(false);

	const handleChange = (value) => {
		setSDescription(value);
	};

	const submitService = (e) => {
		e.preventDefault();
		setIsSubmiting(true);
		updateUser({ service_description: sDescription })
			.then((response) => {
				alert("Descrição do serviço atualizada com sucesso!");
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsSubmiting(false);
			});
	};

	useEffect(() => {
		getUser()
			.then((response) => {
				setSDescription(response.service_description);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<>
					<div className="h-64 flex items-center justify-center">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
					</div>
				</>
			) : (
				<>
					<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
						<div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
							<h3 className="text-gray-800 text-bold text-xl">
								Descrição
							</h3>
							<span className="text-sm">
								Descreva o serviço que está a oferecer. Seja o
								mais pormenorizado possível para que os
								compradores possam perceber se a oferta
								corresponde às suas necessidades.
							</span>
						</div>
						<div className="max-w-xl mx-auto space-y-5 md:w-2/3 ">
							<div className=" relative flex flex-col gap-4">
								<div className="relative">
									<ReactQuill
										theme="snow"
										placeholder="Dê informações sobre o seu serviço..."
										onChange={handleChange}
										value={sDescription}
										ref={reactQuillRef}
									/>
								</div>
							</div>
							{sDescription && (
								<div className="w-full flex justify-end">
									<button
										className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg "
										type="submit"
										onClick={submitService}
										disabled={isSubmiting}
									>
										{isSubmiting ? (
											<div className="flex items-center justify-center">
												<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-400"></div>
											</div>
										) : (
											"Guardar Alterações"
										)}
									</button>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
