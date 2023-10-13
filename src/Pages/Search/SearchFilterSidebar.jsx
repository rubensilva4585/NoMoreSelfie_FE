import './SearchFilterSidebar.css'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { SearchPriceRange } from './SearchPriceRange'
import { SearchCategories } from './SearchCategories'

export default function SearchFilterSidebar(props) {
    const newData = [
        {
            category: 'Casamentos',
            subCategory: [
                { name: 'Casamento1', checked: false },
                { name: 'Casamento2', checked: false },
                { name: 'Casamento3', checked: false }
            ],
        },
        {
            category: 'Fotografia',
            subCategory: [
                { name: 'Fotografia1', checked: false },
                { name: 'Fotografia2', checked: false },
                { name: 'Fotografia3', checked: false }
            ],
        },
        {
            category: 'Edição',
            subCategory: [
                { name: 'Edição1', checked: false },
                { name: 'Edição2', checked: false },
                { name: 'Edição3', checked: false }
            ],
        },
    ]

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [CategoriesData, setCategoriesData] = useState(newData);

    function handleCategories() {
        setIsCategoriesOpen(!isCategoriesOpen);
    }

    function handlePrice() {
        setIsPriceOpen(!isPriceOpen);
    }

    function handleCategoriesData(newData) {
        setCategoriesData(newData)
    }

    return (
        <>
            <div
                className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 siderbar-animation-bg"
                onClick={props.closeSidebar}>
                <div
                    className="bg-white absolute bottom-0 w-full rounded-t-lg shadow-lg p-4 h-[calc(100%-50px)] md:left-0 md:h-full md:w-96 md:rounded-none siderbar-animation"
                    onClick={(e) => e.stopPropagation()}>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl font-bold text-gray-800">Filtrar por</h2>
                        <AiOutlineClose onClick={props.closeSidebar} className='text-gray-400 hover:text-gray-800  text-2xl transition ease-in duration-200' />
                    </div>

                    <form className='flex flex-col justify-between h-[calc(100%-44px)] overflow-y-auto overflow-x-hidden'>
                        <div>
                            <div className='mb-4 border-b'>
                                <div className="mb-2 flex justify-between items-center hover:cursor-pointer select-none" onClick={handleCategories}>

                                    <button className="block font-semibold text-gray-800 " type='button'>Categorias</button>
                                    <MdKeyboardArrowUp className={`text-2xl text-gray-800 transition duration-200 ${isCategoriesOpen ? '-rotate-180' : 'rotate-0'}`} />

                                </div>
                                <div className={`mb-2 ${isCategoriesOpen ? 'block' : 'hidden'}`}>

                                    {CategoriesData.map((category) => (
                                        <SearchCategories Category={category.category} subCategories={category.subCategory} />
                                    ))}
                                </div>
                            </div>

                            <div className='mb-4 border-b'>
                                <div className="mb-2 flex justify-between items-center hover:cursor-pointer select-none" onClick={handlePrice}>

                                    <button className="block font-semibold text-gray-800 " type='button'>Preço</button>
                                    <MdKeyboardArrowUp className={`text-2xl text-gray-800 transition duration-200 ${isPriceOpen ? '-rotate-180' : 'rotate-0'}`} />

                                </div>
                                <div className={`mb-2 ${isPriceOpen ? 'block' : 'hidden'}`}>
                                    <div className="flex flex-col">

                                        <SearchPriceRange />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="py-3.5 px-5 bg-orange-400 hover:bg-orange-500 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                            Ver resultados
                        </button>

                    </form>
                </div>
            </div>
        </>
    )

}