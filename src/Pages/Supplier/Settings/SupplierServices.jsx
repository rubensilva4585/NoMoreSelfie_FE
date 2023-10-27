import React, { useEffect, useState } from "react";
import { SupplierServicesServiceDescription } from "./SupplierServicesServiceDescription";
import Select from "react-select";
import "../../../styles/ReactSelect.css";
import { getCategories, getDistricts } from "../../../API/General";
import {
	getSupplierDistricts,
	getSupplierServices,
	updateSupplierServices,
	updateUserDistricts,
} from "../../../API/User";
import { FaTrash } from "react-icons/fa";
import { is } from "date-fns/locale";
import { set } from "date-fns";

export default function SupplierServices(props) {
	const [districts, setDistricts] = useState(null);
	const [categories, setCategories] = useState(null);
	const [userDistricts, setUserDistricts] = useState(null);
	const [userServices, setUserServices] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isSumbitting, setIsSubmitting] = useState(false);
	const [inputError, setInputError] = useState({
		districts: "",
		services: "",
	});

	const handleSubmitServices = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setInputError({ service_description: "" });

		if (userServices && userServices.length === 0) {
			alert("Tem de adicionar pelo menos um serviço.");
			setInputError({
				...inputError,
				services: "Tem de adicionar pelo menos um serviço.",
			});
			setIsSubmitting(false);
			return;
		}

		if (userServices.some((service) => service.inPerson)) {
			if (userDistricts && userDistricts.length === 0) {
				setInputError({
					...inputError,
					districts: "Tem de adicionar pelo menos um distrito.",
				});
				setIsSubmitting(false);
				return;
			}
			updateUserDistricts(userDistricts)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					alert(error.response.data.error);
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}

		console.log(userServices);

		updateSupplierServices(userServices)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				alert(error.response.data.error);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	const handleDeleteService = (categoryIndex, subcategoryIndex) => {
		const updatedServices = [...userServices];
		updatedServices[categoryIndex].subcategories.splice(
			subcategoryIndex,
			1
		);

		if (updatedServices[categoryIndex].subcategories.length === 0) {
			updatedServices.splice(categoryIndex, 1);
		}

		setUserServices(updatedServices);
	};

	const handlePriceChange = (
		categoryIndex,
		subcategoryIndex,
		field,
		value
	) => {
		const updatedServices = [...userServices];
		updatedServices[categoryIndex].subcategories[subcategoryIndex][field] =
			value;
		setUserServices(updatedServices);
	};

	const addSubcategoryToServices = (selectedSubcategory) => {
		if (selectedCategory && selectedSubcategory) {
			const updatedServices = [...userServices];
			const categoryIndex = updatedServices.findIndex(
				(service) => service.id === selectedCategory
			);

			const subcategoryToAdd = categories
				.find((category) => category.id === selectedCategory)
				.subcategories.find(
					(subcategory) => subcategory.id === selectedSubcategory
				);

			if (categoryIndex !== -1) {
				updatedServices[categoryIndex].subcategories.push({
					id: subcategoryToAdd.id,
					name: subcategoryToAdd.name,
					startPrice: 10,
					endPrice: 200,
				});
			} else {
				const categoryToAdd = categories.find(
					(category) => category.id === selectedCategory
				);
				updatedServices.unshift({
					id: categoryToAdd.id,
					name: categoryToAdd.name,
					inPerson: categoryToAdd.inPerson,
					subcategories: [
						{
							id: subcategoryToAdd.id,
							name: subcategoryToAdd.name,
							startPrice: 10,
							endPrice: 200,
						},
					],
				});
			}
			setUserServices(updatedServices);
			setSelectedSubcategory("");
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		getSupplierDistricts()
			.then((response) => {
				setUserDistricts(response.map((district) => district.id));
			})
			.catch((error) => {
				alert(error.response.data.error);
			});

		getCategories()
			.then((response) => {
				setCategories(response);
			})
			.catch((error) => {
				alert(error.response.data.error);
			});

		getSupplierServices()
			.then((response) => {
				setUserServices(response);
			})
			.catch((error) => {
				alert(error.response.data.error);
			});

		getDistricts().then((response) => {
			setDistricts(
				response.map((district) => ({
					value: district.id,
					label: district.name,
				}))
			);
		});

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<form onSubmit={handleSubmitServices}>
			<section className=" bg-gray-100/50 ">
				<div className="container max-w-6xl mx-auto px-3 md:px-12 pb-16">
					<div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
						{!(
							userServices &&
							categories &&
							userDistricts &&
							districts
						) ? (
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
											Categoria
										</h3>
										<span className="text-sm">
											Escolha as categorias e
											subcategorias mais adequadas ao
											serviço que quer exercer.
										</span>
									</div>
									<div className="max-w-xl mx-auto space-y-5 md:w-2/3 ">
										<div className=" relative flex flex-col gap-4">
											<div className="relative flex gap-4">
												<div className="relative inline-block w-2/3">
													<Select
														options={categories.map(
															(category) => ({
																label: category.name,
																value: category.id,
															})
														)}
														onChange={(e) => {
															console.log(e);
															setSelectedCategory(
																Number(e.value)
															);
														}}
														placeholder="Categoria"
														isSearchable={true}
														className="search-districts"
														classNamePrefix="select"
														noOptionsMessage={() =>
															"Sem resultados."
														}
													/>
												</div>
												<div className="relative inline-block w-full">
													<Select
														options={categories
															.filter(
																(category) =>
																	category.id ===
																	selectedCategory
															)
															.flatMap(
																(category) =>
																	category.subcategories
															)
															.filter(
																(subcategory) =>
																	!userServices
																		.flatMap(
																			(
																				service
																			) =>
																				service.subcategories
																		)
																		.some(
																			(
																				existingSubcategory
																			) =>
																				existingSubcategory.id ===
																				subcategory.id
																		)
															)
															.map(
																(
																	subcategory
																) => ({
																	label: subcategory.name,
																	value: subcategory.id,
																})
															)}
														onChange={(e) =>
															addSubcategoryToServices(
																Number(e.value)
															)
														}
														value={null}
														placeholder="Adicione uma subcategoria..."
														isSearchable={true}
														className="search-districts"
														classNamePrefix="select"
														closeMenuOnSelect={
															false
														}
														noOptionsMessage={() =>
															"Sem resultados."
														}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								{userServices.length > 0 && (
									<>
										<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
											<div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
												<h3 className="text-gray-800 text-bold text-xl">
													Preços
												</h3>
												<span className="text-sm">
													Defina os preços para cada
													subcategoria escolhida.
												</span>
											</div>
											<div className="max-w-xl mx-auto space-y-5 md:w-2/3 max-h-96 overflow-auto">
												<div className=" relative flex flex-col gap-4">
													<table className="min-w-full">
														{userServices.map(
															(
																category,
																categoryIndex
															) => (
																<>
																	<thead
																		key={
																			categoryIndex
																		}
																	>
																		<tr>
																			<th className="px-4 py-0 text-left">
																				{
																					category.name
																				}
																			</th>
																			<th className="px-4 py-0 text-left"></th>
																		</tr>
																	</thead>
																	<tbody>
																		{category.subcategories.map(
																			(
																				subcategory,
																				subcategoryIndex
																			) => (
																				<tr
																					key={
																						subcategoryIndex
																					}
																				>
																					<td className="px-4 py-1">
																						<div className="flex whitespace-nowrap items-center gap-2">
																							<FaTrash
																								className="text-gray-200 hover:text-red-500 cursor-pointer"
																								onClick={() =>
																									handleDeleteService(
																										categoryIndex,
																										subcategoryIndex
																									)
																								}
																							/>
																							{
																								subcategory.name
																							}
																						</div>
																					</td>
																					<td className="px-4 py-1 flex items-center justify-end gap-1">
																						desde{" "}
																						<input
																							className="w-20 px-1 py-0 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-400 transition ease-in duration-200"
																							type="number"
																							placeholder="€"
																							value={
																								subcategory.startPrice
																							}
																							onChange={(
																								e
																							) =>
																								handlePriceChange(
																									categoryIndex,
																									subcategoryIndex,
																									"startPrice",
																									e
																										.target
																										.value
																								)
																							}
																						/>{" "}
																						até{" "}
																						<input
																							className="w-20 px-1 py-0 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-400 transition ease-in duration-200"
																							type="number"
																							placeholder="€"
																							value={
																								subcategory.endPrice
																							}
																							onChange={(
																								e
																							) =>
																								handlePriceChange(
																									categoryIndex,
																									subcategoryIndex,
																									"endPrice",
																									e
																										.target
																										.value
																								)
																							}
																						/>
																					</td>
																				</tr>
																			)
																		)}
																	</tbody>
																</>
															)
														)}
													</table>
												</div>
											</div>
										</div>

										{userServices.some(
											(service) => service.inPerson
										) && (
											<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
												<div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
													<h3 className="text-gray-800 text-bold text-xl">
														Região
													</h3>
													<span className="text-sm">
														Insira quais distritos
														do pais fazem parte da
														sua zona da trabalho.
													</span>
												</div>
												<div className="max-w-xl mx-auto space-y-5 md:w-2/3 ">
													<div className=" relative flex flex-col gap-4">
														<div className="relative flex flex-col">
															<Select
																options={
																	districts
																}
																onChange={(
																	e
																) => {
																	setUserDistricts(
																		e.map(
																			(
																				option
																			) =>
																				option.value
																		)
																	);
																}}
																placeholder="Preencha com as regiões onde trabalha..."
																isSearchable={
																	true
																}
																isClearable={
																	false
																}
																className="custom-select"
																classNamePrefix="select"
																isMulti
																defaultValue={userDistricts.map(
																	(
																		district
																	) =>
																		districts.find(
																			(
																				d
																			) =>
																				d.value ===
																				district
																		)
																)}
																noOptionsMessage={() =>
																	"Sem resultados."
																}
															/>
															{inputError.districts !==
																"" && (
																<span className="text-red-600 text-sm">
																	{
																		inputError.districts
																	}
																</span>
															)}
														</div>
													</div>
												</div>
											</div>
										)}
										<div className="justify-end w-full pr-10 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
											<button
												type="submit"
												className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg "
												disabled={isSumbitting}
											>
												{isSumbitting ? (
													<div className="flex items-center justify-center">
														<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-400"></div>
													</div>
												) : (
													"Guardar Alterações"
												)}
											</button>
										</div>
									</>
								)}
								<hr />

								<SupplierServicesServiceDescription />
							</>
						)}
					</div>
				</div>
			</section>
		</form>
	);
}
