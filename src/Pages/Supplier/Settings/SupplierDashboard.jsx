import React, { useState, useEffect } from "react";
import { FaCalendar, FaEnvelope, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { getSupplierRequests } from "../../../API/User";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function SupplierDashboard(props) {
	const [requestsData, setRequestsData] = useState([]);
	const [nameFilter, setNameFilter] = useState("");

	const handleChangeFilter = (e) => {
		setNameFilter(e.target.value);
	};

	const filterRequests = (request) => {
		return request.name.toLowerCase().includes(nameFilter.toLowerCase());
	};

	useEffect(() => {
		const abortController = new AbortController();

		getSupplierRequests()
			.then((response) => {
				setRequestsData(response);
			})
			.catch((error) => {
				toast.error("Ocorreu um problema.");
			});

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<section className=" bg-gray-100/50 ">
			<div className="container max-w-6xl mx-auto sm:px-3 md:px-12 pb-16">
				{!requestsData ? (
					<>
						<div className="h-64 flex items-center justify-center">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
						</div>
					</>
				) : (
					<div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
						<div className="items-center w-full p-8 space-y-4 text-gray-500 md:space-y-0">
							<div className="flex flex-col  gap-4 md:flex-row md:items-end justify-between">
								<div>
									<h3 className="text-gray-800 text-bold text-2xl leading-tight">
										Pedidos de contacto
									</h3>
									<span className="text-sm">
										Lista de todos os pedidos de contacto
										feitos pelos clientes.
									</span>
								</div>

								<div className="flex relative">
									<input
										type="text"
										id="name"
										className={` rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
										name="name"
										onChange={(e) => handleChangeFilter(e)}
										placeholder="Pesquisar por nome"
									/>
									<span className="rounded-r-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
										<FaSearch className="text-xl" />
									</span>
								</div>
							</div>
							<div className="md:px-4 md:py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
								<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
									<table className="min-w-full leading-normal overflow-auto">
										<thead>
											<tr>
												<th
													scope="col"
													className="px-5 py-3 w-40 text-sm font-normal text-left text-gray-400 uppercase bg-white border-b border-gray-200"
												>
													<FaCalendar className="text-xl" />
												</th>
												<th
													scope="col"
													className="px-5 py-3 w-44 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Nome
												</th>
												<th
													scope="col"
													className="px-5 py-3 w-64 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Contacto
												</th>
												<th
													scope="col"
													className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
												>
													Mensagem
												</th>
											</tr>
										</thead>
										<tbody>
											{requestsData &&
											Array.isArray(requestsData) &&
											requestsData.length > 0 ? (
												<>
													{requestsData
														.filter(filterRequests)
														.map(
															(
																request,
																index
															) => (
																<tr
																	key={index}
																	className="text-gray-900"
																>
																	<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
																		<p className="whitespace-no-wrap">
																			{format(
																				new Date(
																					request.created_at
																				),
																				"dd/MM/yyyy"
																			)}
																		</p>
																	</td>
																	<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
																		<p className="whitespace-no-wrap">
																			{
																				request.name
																			}
																		</p>
																	</td>
																	<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
																		<div className="text-sm bg-white flex flex-col gap-1">
																			{request.email && (
																				<div className="flex gap-1 items-center">
																					<FaEnvelope className="text-md text-gray-400 " />
																					<p className="whitespace-no-wrap">
																						{
																							request.email
																						}
																					</p>
																				</div>
																			)}

																			{request.phone && (
																				<div className="flex gap-1 items-center">
																					<FaPhoneAlt className="text-md text-gray-400 " />
																					<p className="whitespace-no-wrap">
																						{
																							request.phone
																						}
																					</p>
																				</div>
																			)}
																		</div>
																	</td>
																	<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
																		<p className="text-gray-900 whitespace-no-wrap">
																			{
																				request.description
																			}
																		</p>
																	</td>
																</tr>
															)
														)}
												</>
											) : (
												<td
													colSpan="4"
													className="px-5 py-5 text-sm bg-white border-b border-gray-200"
												>
													<p className="text-gray-900 whitespace-no-wrap text-center">
														Não existem pedidos de
														contacto.
													</p>
												</td>
											)}
										</tbody>
									</table>
								</div>
							</div>
							{/* <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700">
                  Página <span className="font-semibold text-gray-900">1</span>{" "}
                  / <span className="font-semibold text-gray-900">10</span>.
                  Resultados:{" "}
                  <span className="font-semibold text-gray-900">100</span>
                </span>

                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 border border-gray-400 rounded-l-lg hover:bg-orange-500 transition ease-in duration-200">
                    <FaArrowLeft className="text-sm mr-2" />
                    Prev
                  </button>
                  <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 border border-l-0 border-gray-400 rounded-r-lg hover:bg-orange-500 transition ease-in duration-200">
                    Next
                    <FaArrowRight className="text-sm ml-2" />
                  </button>
                </div>
              </div> */}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
