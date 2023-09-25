import SearchResultCard from './SearchResultCard';
import SearchModal from './SearchModal'

export default function PageSearch() {
    return (
        <>
            <div className="container mx-auto px-3">
                <div className="w-full bg-white">
                    <div className="flex items-end justify-between mb-12 header">
                        <div className="flex flex-col justify-between gap-8 mb-12 header">
                            <div className="title">
                                <p className="mb-4 text-4xl font-bold text-gray-800">
                                    Fornecedores
                                </p>
                                <p className="text-2xl font-light text-gray-400">
                                    Procure o que precisa na nossa lista de fornecedores
                                </p>
                            </div>
                            <form className="flex justify-start w-4/4">
                                <input type="text" id="category" className=" rounded-s-lg flex-1 border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="O que procura?" />
                                <input type="text" id="category" className=" flex-1 border border-gray-300 w-full py-4 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Onde?" />
                                <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-orange-400 rounded-e-lg shadow-md hover:bg-orange-500 focus:ring-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:outline-none" type="submit">
                                    Pesquisar
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* <SearchModal /> */}


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
            </div>
        </>
    )
}
