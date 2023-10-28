import { useState } from "react";
import { IMAGE_STORAGE_PATH } from "../../constants/General";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PageAdminSuppliersList({
	supliersData,
	handelValidateSupplier,
}) {
	const [nameFilter, setNameFilter] = useState("");

	const handleChangeFilter = (e) => {
		setNameFilter(e.target.value);
	};

	const filterSuppliers = (supplier) => {
		return supplier.name.toLowerCase().includes(nameFilter.toLowerCase());
	};

	return (
		<>
			<section className=" bg-gray-100/50">
				<div className="container max-w-6xl mx-auto px-3 md:px-12 pt-16">
					{!supliersData ? (
						<>
							<div className="h-64 flex items-center justify-center">
								<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
							</div>
						</>
					) : (
						<>
							<div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
								<h2 className="text-2xl leading-tight">
									Lista de Fornecedores
								</h2>
								<div className="text-end">
									<form>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
												<svg
													className="w-4 h-4 text-gray-500"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 20 20"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
													/>
												</svg>
											</div>
											<input
												className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200"
												type="search"
												id="filtername"
												name="filtername"
												onChange={(e) =>
													handleChangeFilter(e)
												}
												placeholder="Pesquisar por nome..."
											/>
										</div>
									</form>
								</div>
							</div>
							<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
								<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th
													scope="col"
													className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Nome
												</th>
												<th
													scope="col"
													className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Empresa
												</th>
												<th
													scope="col"
													className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Nif
												</th>
												<th
													scope="col"
													className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Contacto
												</th>

												<th
													scope="col"
													className="px-5 py-3 w-40 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												></th>
											</tr>
										</thead>
										<tbody>
											{supliersData
												.filter(filterSuppliers)
												.map((supplier, index) => (
													<tr>
														<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
															<Link
																to={
																	"/supplier/" +
																	supplier.user_id
																}
															>
																<div className="flex items-center">
																	<div className="flex-shrink-0">
																		<a
																			href="#"
																			className="relative block"
																		>
																			<img
																				alt="profil"
																				src={
																					supplier &&
																					supplier.avatar
																						? IMAGE_STORAGE_PATH +
																						  supplier.avatar
																						: "./../../images/noavatar.svg"
																				}
																				className="mx-auto object-cover rounded-full h-10 w-10 "
																			/>
																		</a>
																	</div>
																	<div className="ml-3 flex flex-col">
																		<p className="text-gray-900 whitespace-no-wrap">
																			{
																				supplier.name
																			}
																		</p>
																		<span className="text-gray-400 text-sm">
																			{supplier.dob
																				? `${
																						new Date().getFullYear() -
																						new Date(
																							supplier.dob
																						).getFullYear()
																				  } anos`
																				: ""}
																		</span>
																	</div>
																</div>
															</Link>
														</td>
														<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
															<p className="text-gray-900 whitespace-no-wrap">
																{
																	supplier.company
																}
															</p>
														</td>
														<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
															<p className="text-gray-900 whitespace-no-wrap">
																{supplier.nif}
															</p>
														</td>
														<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
															<div className="text-sm bg-white flex flex-col gap-1">
																{supplier.email && (
																	<div className="flex gap-1 items-center">
																		<FaEnvelope className="text-md text-gray-400 " />
																		<p className="whitespace-no-wrap">
																			{
																				supplier.email
																			}
																		</p>
																	</div>
																)}

																{supplier.phone && (
																	<div className="flex gap-1 items-center">
																		<FaPhoneAlt className="text-md text-gray-400 " />
																		<p className="whitespace-no-wrap">
																			{
																				supplier.phone
																			}
																		</p>
																	</div>
																)}
															</div>
														</td>
														<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
															<span
																className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
																	supplier.verified
																		? "text-green-900 bg-green-200"
																		: "text-red-900 bg-red-200"
																}`}
															>
																<input
																	type="checkbox"
																	className={`w-5 h-5 z-25 mr-2 bg-gray-white text-green-500 hover:text-green-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer`}
																	checked={
																		supplier.verified
																	}
																	onChange={() => {
																		handelValidateSupplier(
																			supplier.user_id
																		);
																	}}
																/>
																<span className="relative">
																	{supplier.verified
																		? "Verificado"
																		: "Inativo"}
																</span>
															</span>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
}
