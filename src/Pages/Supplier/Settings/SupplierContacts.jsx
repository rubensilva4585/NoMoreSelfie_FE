import React, { useState } from 'react';
import { SearchPriceRange } from '../../Search/SearchPriceRange';
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaTwitter, FaWordpressSimple } from 'react-icons/fa';


export default function SupplierContacts(props) {
        // const id = props.match.params.id;
        const options = ['Opção 1', 'Opção 2', 'Opção 3'];
        const [selectedOptions, setSelectedOptions] = useState([]);

        const handleOptionChange = (index) => {
                if (selectedOptions.includes(index)) {
                        setSelectedOptions(selectedOptions.filter((item) => item !== index));
                } else {
                        setSelectedOptions([...selectedOptions, index]);
                }
        };

        const toggleDropdown = () => {
                const dropdown = document.getElementById('custom-select-dropdown');
                dropdown.classList.toggle('hidden');
        };

        return (
                <section className=" bg-gray-100/50 ">
                        <div className="container max-w-6xl mx-auto px-3 md:px-12 pb-16">
                                <div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
                                        <div className="items-top w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                        <h3 className="text-gray-800 text-bold text-xl">Redes Sociais</h3>
                                                        <span className="text-sm">Preencha os campos com os links das suas redes sociais e do seu website/portfolio, de modo a dar a conhecer o seu trabalho para o público e futuros clientes.</span>
                                                </div>
                                                <div className="max-w-xl mx-auto space-y-5 md:w-2/3 ">
                                                        <div className=" relative flex flex-col gap-4">

                                                                {/* facebook */}
                                                                <div className="flex relative">
                                                                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                <FaFacebook className="text-xl" />
                                                                                <span className='ml-3 text-gray-400'>facebook.com/</span>
                                                                        </span>
                                                                        <input
                                                                                type="text"
                                                                                id="facebook"
                                                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                name="facebook"
                                                                                placeholder="nome_de_utilizador" />
                                                                </div>

                                                                {/* instagram */}
                                                                <div className="flex relative">
                                                                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                <FaInstagram className="text-xl" />
                                                                                <span className='ml-3 text-gray-400'>intagram.com/</span>
                                                                        </span>
                                                                        <input
                                                                                type="text"
                                                                                id="instagram"
                                                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                name="instagram"
                                                                                placeholder="nome_de_utilizador" />
                                                                </div>

                                                                {/* pinterest */}
                                                                <div className="flex relative">
                                                                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                <FaPinterest className="text-xl" />
                                                                                <span className='ml-3 text-gray-400'>pinterest.pt/</span>
                                                                        </span>
                                                                        <input
                                                                                type="text"
                                                                                id="pinterest"
                                                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                name="pinterest"
                                                                                placeholder="nome_de_utilizador" />
                                                                </div>

                                                                {/* linkdin */}
                                                                <div className="flex relative">
                                                                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                <FaLinkedin className="text-xl" />
                                                                                <span className='ml-3 text-gray-400'>linkedin.com/in/</span>
                                                                        </span>
                                                                        <input
                                                                                type="text"
                                                                                id="instagram"
                                                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                name="instagram"
                                                                                placeholder="nome_de_utilizador" />
                                                                </div>

                                                                {/* website */}
                                                                <div className="flex relative">
                                                                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                <FaLink className="text-xl" />
                                                                        </span>
                                                                        <input
                                                                                type="text"
                                                                                id="website"
                                                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                name="website"
                                                                                placeholder="website.com" />
                                                                </div>

                                                                <div className="flex w-full mt-2 justify-end">
                                                                        <button
                                                                                type="submit"
                                                                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                                                Guardar Alterações
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}
