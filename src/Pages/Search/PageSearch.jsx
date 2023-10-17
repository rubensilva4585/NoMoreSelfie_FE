import { useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import SearchResultCard from './SearchResultCard';
import SearchFilterSidebar from './SearchFilterSidebar';
import SearchServices from "./SearchServices.jsx";


export default function PageSearch() {
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

    function handleFilterSidebar() {
        setIsFilterSidebarOpen(!isFilterSidebarOpen);
    }

    const regions = [
        { name: "Aveiro" },
        { name: "Beja" },
        { name: "Braga" },
        { name: "Bragança" },
        { name: "Castelo Branco" },
        { name: "Coimbra" },
        { name: "Évora" },
        { name: "Faro" },
        { name: "Guarda" },
        { name: "Leiria" },
        { name: "Lisboa" },
        { name: "Portalegre" },
        { name: "Porto" },
        { name: "Santarém" },
        { name: "Setúbal" },
        { name: "Viana do Castelo" },
        { name: "Vila Real" },
        { name: "Viseu" },
    ];

    const categories = [
        { name: "Casamento" },
        { name: "Fotografia" },
        { name: "Edição de Vídeo" },
    ];

    return (
        <>
            <section class="relative bg-gray-100/50 overflow-hidden" id="sobre">
                <div class="absolute top-[-796px] right-0 mt-[100px] ml-[-50%] h-[1000px] w-[50%] rounded-l-[50%] overflow-hidden">
                    <img src='../../../images/wallsearch.jpg' alt="" className="xl:bottom-[-130px] lg:bottom-[-20px] lg:block hidden absolute" />
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
                                        Tudo o que precisa na nossa lista de profissionais
                                    </p>
                                </div>

                                <SearchServices Regions={regions} Categories={categories} />

                                {/*<form className="flex justify-start w-4/4">*/}
                                {/*    <input type="text" id="category" className=" rounded-s-lg flex-1 border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="O que procura?" />*/}
                                {/*    <input type="text" id="category" className=" flex-1 border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Onde?" />*/}
                                {/*    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-e-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none" type="submit">*/}
                                {/*        Pesquisar*/}
                                {/*    </button>*/}
                                {/*</form>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-3 md:px-12 pb-16">
                    <div className="w-full border-t border-gray-200">
                    </div>

                    <div className="flex items-center justify-end my-6" >
                        <button
                            className="flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none transition duration-200 ease-in"
                            type="button"
                            onClick={handleFilterSidebar} >
                            <BsFilterLeft className="mr-2 text-xl" /> Filtros
                        </button>
                    </div>


                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                        <SearchResultCard />
                    </div>
                </div>
                {isFilterSidebarOpen && (
                    <SearchFilterSidebar closeSidebar={handleFilterSidebar} />
                )}
            </section>

        </>
    )
}
