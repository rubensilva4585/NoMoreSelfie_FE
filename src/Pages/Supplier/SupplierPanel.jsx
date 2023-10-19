import { Link } from "react-router-dom";

export default function SupplierPanel() {
        const activeTab = location.pathname.split('/')[2];

        return (
                <section class=" bg-gray-100/50">
                        <div class="container max-w-6xl mx-auto px-3 md:px-12 pt-16">

                                <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
                                        <h2 class="text-4xl leading-tight">
                                                Painel de Fornecedor
                                        </h2>
                                </div>
                                <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                                        <div class="overflow-hidden bg-white shadow sm:rounded-lg px-4 sm:px-6 flex -mb-px justify-start gap-4">
                                                <Link to="/supplier/dashboard"
                                                        className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${activeTab === 'dashboard' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'} `}
                                                        >
                                                        Dashboard
                                                </Link>
                                                <Link to="/supplier/services"
                                                        className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${activeTab === 'services' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'} `}
                                                        >
                                                        Serviços
                                                </Link>
                                                <Link to="/supplier/portfolio"
                                                        className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${activeTab === 'portfolio' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'} `}
                                                        >
                                                        Portfólio
                                                </Link>
                                                <Link to="/supplier/contacts" 
                                                        className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-100 text-lg ${activeTab === 'contacts' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'} `}
                                                        >
                                                        Contactos
                                                </Link>
                                        </div>
                                </div>

                                {/* <div class="px-4 py-4 -mx-4 sm:-mx-8 sm:px-8 overflow-hidden">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"> */}
                                                {/* <div className="m-auto overflow-hidden rounded-lg shadow-md cursor-pointer w-full">

                                                        <Link to="/service/1" className="block w-full h-full">
                                                                <SearchCardCarousel />
                                                                <div className="w-full p-4 bg-white retative">
                                                                        <div className="flex flex-col gap-2 text-gray-600">
                                                                                <div className="flex flex-wrap gap-1">
                                                                                        <span className="px-2  text-xs rounded-full text-red-600 border border-red-600 bg-red-200 ">
                                                                                                Edição Video
                                                                                        </span>
                                                                                        <span className="px-2  text-xs rounded-full text-pink-600 border border-red-600 bg-pink-200 ">
                                                                                                Casamentos
                                                                                        </span>
                                                                                </div>
                                                                        
                                                                                <div className="text-sm h-13 overflow-hidden text-ellipsis line-clamp-3 text-black">
                                                                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptates.saaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaa
                                                                                </div>
                                                                                <div className="flex justify-between items-center">
                                                                                        <Link to="/supplier/services/edit/1">
                                                                                                <FaEdit className="text-gray-200 hover:text-black" />
                                                                                        </Link>
                                                                                        <div className="text-end text-sm">
                                                                                                A partir de <span className="text-black text-lg font-semibold">500€</span>
                                                                                        </div>
                                                                                </div>
                                                                        </div>

                                                                </div>

                                                        </Link>
                                                </div>
                                                <div className="m-auto overflow-hidden rounded-lg cursor-pointer w-full h-full transition-transform transform shadow-md">
                                                        <Link to="/supplier/services/new" className="block w-full h-full">
                                                                <div className="w-full h-full p-4 bg-white flex justify-center items-center flex-col text-gray-600 ease-in duration-100 hover:text-black gap-5">
                                                                        <FaPlusCircle size={64} />
                                                                        <div className="font-bold">
                                                                                Criar novo serviço
                                                                        </div>
                                                                </div>
                                                        </Link>
                                                </div> */}
                                        {/* </div>
                                </div> */}
                        </div>
                </section>
        )
}
