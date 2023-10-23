import React, { useState, useEffect } from 'react';
import { getUserByID, updateUser } from '../../../services/user_api/user';
import Cookies from 'js-cookie';
import { SearchPriceRange } from '../../Search/SearchPriceRange';
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaPinterest, FaTwitter, FaWordpressSimple } from 'react-icons/fa';


export default function SupplierContacts(props) {
        // const id = props.match.params.id;
        // const options = ['Opção 1', 'Opção 2', 'Opção 3'];
        // const [selectedOptions, setSelectedOptions] = useState([]);

        // const handleOptionChange = (index) => {
        //         if (selectedOptions.includes(index)) {
        //                 setSelectedOptions(selectedOptions.filter((item) => item !== index));
        //         } else {
        //                 setSelectedOptions([...selectedOptions, index]);
        //         }
        // };

        // const toggleDropdown = () => {
        //         const dropdown = document.getElementById('custom-select-dropdown');
        //         dropdown.classList.toggle('hidden');
        // };

        const usernamePattern = /^[\w]+$/;
        const websitePattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        const token = Cookies.get('token');
        const [user, setUser] = useState({});
        const [errors, setErrors] = useState({
                facebook: '',
                instagram: '',
                pinterest: '',
                linkedin: '',
                website: ''
        })

        const updateError = (fieldName, value) => {
                setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: value }));
        }

        const clearErrors = () => {
                setErrors({
                        facebook: '',
                        instagram: '',
                        pinterest: '',
                        linkedin: '',
                        website: ''
                })
        }

        useEffect(() => {
                getUserByID(Cookies.get('userId'))
                        .then((response) => {
                                setUser(response);
                                console.log(response)
                        })
                        .catch((error) => {
                                console.log(error);
                        });
        }, []);


        function submitSocials(e) {
                e.preventDefault();
                let hasErrors = false;
                clearErrors();

                const newSocials = {
                        facebook: '',
                        instagram: '',
                        pinterest: '',
                        linkedin: '',
                        website: ''
                }

                if (!usernamePattern.test(e.target.facebook.value) && e.target.facebook.value !== '') {
                        updateError('facebook', 'Nome de utilizador inválido');
                        hasErrors = true;
                } else {
                        newSocials.facebook = `https://www.facebook.com/${e.target.facebook.value}`;
                }
                if (!usernamePattern.test(e.target.instagram.value) && e.target.instagram.value !== '') {
                        updateError('instagram', 'Nome de utilizador inválido');
                        hasErrors = true;
                } else {
                        newSocials.instagram = `https://www.instagram.com/${e.target.instagram.value}`;
                }
                if (!usernamePattern.test(e.target.pinterest.value) && e.target.pinterest.value !== '') {
                        updateError('pinterest', 'Nome de utilizador inválido');
                        hasErrors = true;
                } else {
                        newSocials.pinterest = `https://www.pinterest.pt/${e.target.pinterest.value}`;
                }
                if (!usernamePattern.test(e.target.linkedin.value) && e.target.linkedin.value !== '') {
                        updateError('linkedin', 'Nome de utilizador inválido');
                        hasErrors = true;
                } else {
                        newSocials.linkedin = `https://www.linkedin.com/in/${e.target.linkedin.value}`;
                }
                if (!websitePattern.test(e.target.website.value) && e.target.website.value !== '') {
                        updateError('website', 'Website inválido');
                        hasErrors = true;
                } else {
                        newSocials.website = e.target.website.value;
                }

                if (hasErrors) return;


                console.log(newSocials)
                updateUser(newSocials, token)
        }


        return (
                <section className=" bg-gray-100/50 ">
                        <div className="container max-w-6xl mx-auto px-3 md:px-12 pb-16">
                                <div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
                                        <div className="items-top w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                <div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                        <h3 className="text-gray-800 text-bold text-xl">Redes Sociais</h3>
                                                        <span className="text-sm">Preencha os campos com os links das suas redes sociais e do website, de modo a destacar o seu trabalho para o público e futuros clientes.</span>
                                                </div>
                                                <div className="max-w-xl mx-auto space-y-5 md:w-2/3 ">
                                                        <form onSubmit={submitSocials}>
                                                                <div className=" relative flex flex-col gap-4">


                                                                        {/* facebook */}
                                                                        <div className="flex relative">
                                                                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                        <FaFacebook className="text-xl" />
                                                                                        <span className='ml-3 text-gray-400'>facebook.com/</span>
                                                                                </span>
                                                                                <input
                                                                                        type="text"
                                                                                        id="facebook"
                                                                                        className={`rounded-r-lg flex-1 appearance-none border ${errors.facebook === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                                                        name="facebook"
                                                                                        placeholder="nome_de_utilizador" />
                                                                        </div>
                                                                        {errors.facebook !== '' && <span className="text-red-600 text-sm">{errors.facebook}</span>}

                                                                        {/* instagram */}
                                                                        <div className="flex relative">
                                                                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                        <FaInstagram className="text-xl" />
                                                                                        <span className='ml-3 text-gray-400'>intagram.com/</span>
                                                                                </span>
                                                                                <input
                                                                                        type="text"
                                                                                        id="instagram"
                                                                                        className={` rounded-r-lg flex-1 appearance-none border ${errors.instagram === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                                                        name="instagram"
                                                                                        placeholder="nome_de_utilizador" />
                                                                        </div>
                                                                        {errors.instagram !== '' && <span className=" text-red-600 text-sm">{errors.instagram}</span>}

                                                                        {/* pinterest */}
                                                                        <div className="flex relative">
                                                                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                        <FaPinterest className="text-xl" />
                                                                                        <span className='ml-3 text-gray-400'>pinterest.pt/</span>
                                                                                </span>
                                                                                <input
                                                                                        type="text"
                                                                                        id="pinterest"
                                                                                        className={` rounded-r-lg flex-1 appearance-none border ${errors.pinterest === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                                                        name="pinterest"
                                                                                        placeholder="nome_de_utilizador" />
                                                                        </div>
                                                                        {errors.pinterest !== '' && <span className="text-red-600 text-sm">{errors.pinterest}</span>}

                                                                        {/* linkedin */}
                                                                        <div className="flex relative">
                                                                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                        <FaLinkedin className="text-xl" />
                                                                                        <span className='ml-3 text-gray-400'>linkedin.com/in/</span>
                                                                                </span>
                                                                                <input
                                                                                        type="text"
                                                                                        id="linkedin"
                                                                                        className={` rounded-r-lg flex-1 appearance-none border ${errors.linkedin === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                                                        name="linkedin"
                                                                                        placeholder="nome_de_utilizador" />
                                                                        </div>
                                                                        {errors.linkedin !== '' && <span className="text-red-600 text-sm">{errors.linkedin}</span>}

                                                                        {/* website */}
                                                                        <div className="flex relative">
                                                                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-100/50 border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                                                        <FaLink className="text-xl" />
                                                                                </span>
                                                                                <input
                                                                                        type="text"
                                                                                        id="website"
                                                                                        className={` rounded-r-lg flex-1 appearance-none border ${errors.website === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                                                        name="website"
                                                                                        placeholder="website.com" />
                                                                        </div>
                                                                        {errors.website !== '' && <span className="text-red-600 text-sm">{errors.website}</span>}

                                                                        <div className="flex w-full mt-2 justify-end">
                                                                                <button
                                                                                        type="submit"
                                                                                        className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                                                        Guardar Alterações
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}
