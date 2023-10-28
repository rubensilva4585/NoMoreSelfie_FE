import { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import SearchResultCard from "./SearchResultCard";
import SearchFilterSidebar from "./SearchFilterSidebar";
import {
	getCategories,
	getDistricts,
	getValidSuppliersList,
} from "../../API/General";
import Select from "react-select";
import "../../styles/ReactSelect.css";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router";
import toast from "react-hot-toast";

export default function PageSearch() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const categoryId = searchParams.get("category_id");
	const districtId = searchParams.get("district_id");

	const [supData, setSupData] = useState(null);
	const [districts, setDistricts] = useState(null);
	const [categories, setCategories] = useState(null);
	const [filters, setFilters] = useState({
		category: categoryId ? categoryId : "",
		district: districtId ? districtId : "",
		minPrice: "",
		maxPrice: "",
	});
	const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

	const filterSuppliers = (supplier) => {
		let isValid = true;

		if (isValid && filters.category) {
			isValid = supplier.services.some(
				(service) => service.category_id === Number(filters.category)
			);
		}
		if (isValid && filters.district) {
			isValid = supplier.districts.some(
				(district) => district.id === Number(filters.district)
			);
		}
		if (isValid && filters.minPrice && filters.maxPrice) {
			const lowestStartPrice = supplier.services.reduce(
				(lowest, service) => {
					return Math.min(
						lowest,
						...service.subcategories.map((subcategory) =>
							parseFloat(subcategory.startPrice)
						)
					);
				},
				Infinity
			);

			const highestEndPrice = supplier.services.reduce(
				(highest, service) => {
					return Math.max(
						highest,
						...service.subcategories.map((subcategory) =>
							parseFloat(subcategory.endPrice)
						)
					);
				},
				-Infinity
			);

			if (lowestStartPrice < filters.minPrice) {
				return false;
			}
			if (highestEndPrice > filters.maxPrice) {
				return false;
			}
		}
		return isValid;
	};

	function handleFilterSidebar() {
		setIsFilterSidebarOpen(!isFilterSidebarOpen);
	}

	const handleFilterPrice = (range) => {
		setFilters({ ...filters, minPrice: range[0], maxPrice: range[1] });
		setIsFilterSidebarOpen(false);
	};

	useEffect(() => {
		const abortController = new AbortController();

		getValidSuppliersList()
			.then((res) => {
				setSupData(res);
			})
			.catch((err) => {
				toast.error("Ocorreu um problema.");
			});

		getDistricts()
			.then((res) => {
				setDistricts(
					res.map((district) => ({
						value: district.id,
						label: district.name,
					}))
				);
			})
			.catch((err) => {
				toast.error("Ocorreu um problema.");
			});

		getCategories()
			.then((res) => {
				setCategories(
					res.map((category) => ({
						value: category.id,
						label: category.name,
					}))
				);
			})
			.catch((err) => {
				toast.error("Ocorreu um problema.");
			});

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<>
			<section class="relative bg-gray-100/50 overflow-hidden" id="sobre">
				<div class="absolute top-[-796px] right-0 mt-[100px] ml-[-50%] h-[1000px] w-[50%] rounded-l-[50%] overflow-hidden">
					<img
						src="../../../images/wallsearch.jpg"
						alt=""
						className="xl:bottom-[-130px] lg:bottom-[-20px] lg:block hidden absolute"
					/>
				</div>
				<div className="container mx-auto px-3 md:px-12 py-16">
					<div className="w-full">
						<div className="flex items-end justify-between header">
							<div className="flex flex-col justify-between gap-8 header">
								<div className="title">
									<p className="mb-4 text-4xl font-bold text-gray-800">
										Profissionais
									</p>
									<p className="text-2xl font-light text-gray-400">
										Tudo o que precisa na nossa lista de
										profissionais
									</p>
								</div>

								<div className="flex flex-wrap justify-start w-4/4 ">
									<div className="relative w-56 h-14">
										{categories && (
											<Select
												options={categories}
												onChange={(e) =>
													e
														? setFilters({
																...filters,
																category:
																	e.value,
														  })
														: setFilters({
																...filters,
																category: "",
														  })
												}
												placeholder="O que procura?"
												isSearchable={true}
												isClearable={true}
												className="search-category"
												classNamePrefix="select"
												noOptionsMessage={() =>
													"Sem resultados."
												}
											/>
										)}
									</div>
									<div className="relative w-56 h-14">
										{districts && (
											<Select
												options={districts}
												onChange={(e) =>
													e
														? setFilters({
																...filters,
																district:
																	e.value,
														  })
														: setFilters({
																...filters,
																district: "",
														  })
												}
												placeholder="Onde?"
												isSearchable={true}
												isClearable={true}
												className="search-districts"
												classNamePrefix="select"
												noOptionsMessage={() =>
													"Sem resultados."
												}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container mx-auto px-3 md:px-12 pb-16">
					<div className="w-full border-t border-gray-200" />

					<div className="flex items-center justify-end my-6">
						{filters.minPrice && filters.minPrice && (
							<div
								onClick={() =>
									setFilters({
										...filters,
										minPrice: "",
										maxPrice: "",
									})
								}
								className="p-2 mr-4 border rounded-full bg-gray-200 border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 cursor-pointer text-md font-semibold flex items-center gap-2"
							>
								<span>
									De {filters.minPrice}€ até{" "}
									{filters.maxPrice}€
								</span>
								<FaTimes />
							</div>
						)}
						<button
							className="flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none transition duration-200 ease-in"
							type="button"
							onClick={handleFilterSidebar}
						>
							<BsFilterLeft className="mr-2 text-xl" /> Filtros
						</button>
					</div>

					{supData ? (
						<>
							{supData.filter(filterSuppliers).length === 0 ? (
								<div className="text-center w-full h-60">
									Não existem resultados.
								</div>
							) : (
								<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{supData
										.filter(filterSuppliers)
										.map((sup, index) => {
											return (
												<SearchResultCard
													supplier={sup}
												/>
											);
										})}
								</div>
							)}
						</>
					) : (
						<div className="flex items-center justify-center">
							<p className="text-2xl font-light text-gray-400">
								A carregar...
							</p>
						</div>
					)}
				</div>
				{isFilterSidebarOpen && (
					<SearchFilterSidebar
						closeSidebar={handleFilterSidebar}
						handleFilterPrice={handleFilterPrice}
					/>
				)}
			</section>
		</>
	);
}
