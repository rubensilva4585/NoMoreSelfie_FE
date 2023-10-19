import { useState } from "react";
// import queryString from 'query-string';
import React from 'react';
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { SearchPriceRange } from "../../Search/SearchPriceRange";
import SupplierServicesFormImgUpload from "./SupplierServicesFormImgUpload";

export default function SupplierServicesForm(props) {
        const [activeTab, setActiveTab] = useState('active');
        // const id = props.match.params.id;
        const id = useParams().id ? useParams().id : null;
        console.log(id);
        const options = ['Opção 1', 'Opção 2', 'Opção 3'];
        const handleTabChange = (tab) => {
                setActiveTab(tab);
        };
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
                <section class=" bg-gray-100/50 py-16">
                        <div class="container max-w-4xl mx-auto shadow-md">
                                <div class="p-4 border-t-2 border-orange-400 rounded-lg bg-gray-100/5 flex justify-between items-center">
                                        <h2 class="text-2xl leading-tight">
                                                {id ? 'Editar Serviço' : 'Novo Serviço'}
                                        </h2>
                                        <Link to="/supplier/services/" className="flex gap-2 justify-center items-center text-gray-400 hover:text-black">
                                                <FaArrowLeft /> Voltar para a lista de serviços
                                        </Link>
                                </div>
                                <div class="space-y-6 bg-white">
                                        <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <div class="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                        <h3 class="text-gray-800 text-bold text-xl">Categoria</h3>
                                                        <span className="text-sm">Escolha as categorias e sub-categorias mais adequadas ao serviço que quer exercer.</span>
                                                </div>
                                                <div class="max-w-xl mx-auto space-y-5 md:w-2/3 ">
                                                        <div class=" relative flex flex-col gap-4">
                                                                <div className="relative flex gap-4">
                                                                        <select className="block w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50">
                                                                                <option value="">Categoria</option>
                                                                                <option value="opcao1">Opção 1</option>
                                                                                <option value="opcao2">Opção 2</option>
                                                                                <option value="opcao3">Opção 3</option>
                                                                        </select>
                                                                        <div className="relative inline-block w-full">
                                                                                <div
                                                                                        className="border border-gray-300 rounded-lg p-2 cursor-pointer"
                                                                                        onClick={toggleDropdown}
                                                                                >
                                                                                        Selecione as opções
                                                                                </div>

                                                                                <div
                                                                                        id="custom-select-dropdown"
                                                                                        className="absolute top-10 border border-gray-300 bg-white p-2 rounded-lg hidden z-10"
                                                                                >
                                                                                        <label className="block font-bold text-gray-800">Escolha as opções:</label>
                                                                                        {options.map((subCategory, index) => (
                                                                                                <div key={index} className="inline-flex my-1 pt-1 items-center">
                                                                                                        <input
                                                                                                                type="checkbox"
                                                                                                                className="w-5 h-5 text-orange-500 bg-gray-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                                                                                                checked={selectedOptions.includes(index)}
                                                                                                                onChange={() => handleOptionChange(index)}
                                                                                                        />
                                                                                                        <span className="ml-2 text-gray-800">{subCategory}</span>
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>

                                        <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <div class="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                        <h3 class="text-gray-800 text-bold text-xl">Preços</h3>
                                                        <span className="text-sm">Defina os preços para cada sub-categoria escolhida.</span>
                                                </div>
                                                <div class="max-w-xl mx-auto space-y-5 md:w-2/3 ">
                                                        <div class=" relative flex flex-col gap-4">
                                                                <table className="min-w-full">
                                                                        <thead>
                                                                                <tr>
                                                                                        <th className="px-4 py-2 text-left">Subcategoria</th>
                                                                                        <th className="px-4 py-2 text-left">Preço</th>
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                                <tr>
                                                                                        <td className="px-4 py-2">Subcategoria 1</td>
                                                                                        <td className="px-4 py-2"><SearchPriceRange /></td>
                                                                                </tr>
                                                                                <tr className="border-t">
                                                                                        <td className="px-4 py-2">Subcategoria 2</td>
                                                                                        <td className="px-4 py-2"><SearchPriceRange /></td>
                                                                                </tr>
                                                                                <tr className="border-t">
                                                                                        <td className="px-4 py-2">Subcategoria 3</td>
                                                                                        <td className="px-4 py-2"><SearchPriceRange /></td>
                                                                                </tr>
                                                                        </tbody>
                                                                </table>


                                                        </div>
                                                </div>
                                        </div>

                                        <hr />

                                        <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <div class="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                        <h3 class="text-gray-800 text-bold text-xl">Descrição</h3>
                                                        <span className="text-sm">Descreva o serviço que está a oferecer. Seja o mais pormenorizado possível para que os compradores possam perceber se a oferta corresponde às suas necessidades.</span>
                                                </div>
                                                <div class="max-w-xl mx-auto space-y-5 md:w-2/3 ">
                                                        <div class=" relative flex flex-col gap-4">
                                                                <div className="relative">
                                                                        <textarea
                                                                                className="resize-none flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                                                                id="comment"
                                                                                placeholder="Dê informações sobre o seu serviço..."
                                                                                name="comment"
                                                                                rows="5"
                                                                                cols="40" />
                                                                        <div className="absolute bottom-2 right-2 text-sm text-gray-400">10/255 caracteres</div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>

                                        <hr />

                                        <div class="items-center w-full p-4 space-y-4 text-gray-500 md:space-y-0">
                                                <div class="">
                                                        <h3 class="text-gray-800 text-bold text-xl">Galeria</h3>
                                                        <span className="text-sm">Chame a atenção dos compradores certos com exemplos visuais dos seus serviços.</span>
                                                </div>
                                                <div class="flex flex-col gap-4 pt-4">

                                                        <SupplierServicesFormImgUpload />
                                                </div>
                                        </div>
                                </div>
                                <div class="items-center w-full p-6 m-0 text-gray-500 ">
                                        <div class="w-full flex justify-between">
                                                <Link to="/supplier/services/" className="flex gap-2 justify-center items-center text-gray-400 hover:text-black">
                                                        <FaArrowLeft /> Voltar para a lista de serviços
                                                </Link>
                                                <button
                                                        type="submit"
                                                        className="py-2.5 px-4 text-green-400 border-green-400 border hover:bg-green-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                        {id ? 'Guardar Alterações' : 'Criar Serviço'}
                                                </button>
                                        </div>
                                </div>
                        </div>
                </section>
                // <>
                //         <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
                //                 <h2 class="text-2xl leading-tight">
                //                         Novo Serviço
                //                 </h2>
                //         </div>
                //         <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                //                 category(select) subcategory(dropdown multipleselect)
                //                 subcategorias selecionadas
                //                 tabela preços
                //                         subcategoria - preço
                //         </div>
                // </>
        )
}
