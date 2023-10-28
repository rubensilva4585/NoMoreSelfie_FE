import { useEffect, useState } from "react";
import { getCategories, getDistricts } from "../../API/General";
import Select from "react-select";
import "../../styles/ReactSelect.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function HomeSectionSearchBar() {
	const [districts, setDistricts] = useState(null);
	const [categories, setCategories] = useState(null);
	const [filters, setFilters] = useState({
		category: "",
		district: "",
	});

	useEffect(() => {
		const abortController = new AbortController();

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
			<section
				className="relative bg-gray-100/50 overflow-x-hidden"
				id="sobre"
			>
				<div className="hidden absolute bottom-0 xl:block right-0 mt-[100px] ml-[-50%] h-[200%] w-[50%] rounded-l-[50%] overflow-hidden">
					<img
						src="../../../images/wallsearch.jpg"
						alt=""
						className="bottom-0 absolute"
					/>
				</div>

				<div className="container mx-auto px-3 md:px-12 py-20">
					<div className="flex items-end justify-between mb-12 header">
						<div className="flex flex-col justify-between gap-8 mb-12 header">
							<div className="title">
								<p className="mb-4 text-4xl font-bold text-gray-800">
									Fornecedores
								</p>
								<p className="text-2xl font-light text-gray-400">
									Procure o que precisa na nossa lista de
									fornecedores
								</p>
							</div>

							<div className="flex flex-wrap justify-start w-4/4 items-center">
								<div className="relative w-56 h-14">
									{categories && (
										<Select
											options={categories}
											onChange={(e) =>
												e
													? setFilters({
															...filters,
															category: e.value,
													  })
													: setFilters({
															...filters,
															category: "",
													  })
											}
											placeholder="O que procura?"
											isSearchable={true}
											isClearable={true}
											className="home"
											classNamePrefix="select"
											noOptionsMessage={() =>
												"Sem resultados."
											}
											maxMenuHeight={170}
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
															district: e.value,
													  })
													: setFilters({
															...filters,
															district: "",
													  })
											}
											placeholder="Onde?"
											isSearchable={true}
											isClearable={true}
											className="home"
											classNamePrefix="select"
											noOptionsMessage={() =>
												"Sem resultados."
											}
											maxMenuHeight={170}
										/>
									)}
								</div>
								<div className="relative w-56 h-14">
									<Link
										to={`/search?${
											filters.category &&
											"category_id=" + filters.category
										}&${
											filters.district &&
											"district_id=" + filters.district
										}`}
									>
										<button className="bg-orange-400 hover:bg-orange-700 text-white font-bold shadow-md h-11 py-auto px-4 rounded">
											Pesquisar
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
