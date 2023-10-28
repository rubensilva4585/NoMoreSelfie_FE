import { Link } from "react-router-dom";

export default function SupplierPanel() {
	const activeTab = location.pathname.split("/")[2];

	return (
		<section className=" bg-gray-100/50">
			<div className="container max-w-6xl mx-auto sm:px-3 md:px-12 pt-16">
				<div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
					<h2 className="text-4xl leading-tight ml-3 sm:ml-0">
						Painel de Fornecedor
					</h2>
				</div>
				
				<div className="py-4 overflow-hidden">
					<div className="overflow-x-auto bg-white shadow sm:rounded-lg  sm:px-6 flex justify-start md:gap-4 whitespace-nowrap">
						<Link
							to="/supplier/dashboard"
							className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${
								activeTab === "dashboard"
									? "text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500"
									: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
							} `}
						>
							Dashboard
						</Link>
						<Link
							to="/supplier/services"
							className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${
								activeTab === "services"
									? "text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500"
									: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
							} `}
						>
							Serviços
						</Link>
						<Link
							to="/supplier/portfolio"
							className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${
								activeTab === "portfolio"
									? "text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500"
									: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
							} `}
						>
							Portfólio
						</Link>
						<Link
							to="/supplier/contacts"
							className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${
								activeTab === "contacts"
									? "text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500"
									: "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
							} `}
						>
							Redes Sociais
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
