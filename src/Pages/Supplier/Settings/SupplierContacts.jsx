import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../../../API/User';

import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaPinterest } from 'react-icons/fa';


export default function SupplierContacts(props) {
        const usernamePattern = /^[a-zA-Z0-9][a-zA-Z0-9._]*$/;
        const websitePattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;;
        const [user, setUser] = useState({});
        const [isLoading, setIsLoading] = useState(true);
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
                getUser()
                        .then((response) => {
                                setUser(response);
                                console.log(response)
                        })
                        .catch((error) => {
                                console.log(error);
                        })
                        .finally(() => {
                                setIsLoading(false);
                        })
        }, []);

        function submitSocials(e) {
                e.preventDefault();
                let hasErrors = false;
                clearErrors();

                const newSocials = {
                        facebook: e.target.facebook.value,
                        instagram: e.target.instagram.value,
                        pinterest: e.target.pinterest.value,
                        linkedin: e.target.linkedin.value,
                        website: e.target.website.value
                }

                if (newSocials.facebook.includes('facebook.com/')) {
                        newSocials.facebook = newSocials.facebook.split('facebook.com/')[1];
                }
                if (!usernamePattern.test(newSocials.facebook) && newSocials.facebook !== '') {
                        updateError('facebook', 'Nome de utilizador inválido');
                        hasErrors = true;
                }

                if (newSocials.instagram.includes('instagram.com/')) {
                        newSocials.instagram = newSocials.instagram.split('instagram.com/')[1];
                }
                if (!usernamePattern.test(newSocials.instagram) && newSocials.instagram !== '') {
                        updateError('instagram', 'Nome de utilizador inválido');
                        hasErrors = true;
                }

                if (newSocials.pinterest.includes('pinterest.pt/')) {
                        newSocials.pinterest = newSocials.pinterest.split('pinterest.pt/')[1];
                }
                if (newSocials.pinterest.includes('pinterest.com/')) {
                        newSocials.pinterest = newSocials.pinterest.split('pinterest.com/')[1];
                }
                if (!usernamePattern.test(newSocials.pinterest) && newSocials.pinterest !== '') {
                        updateError('pinterest', 'Nome de utilizador inválido');
                        hasErrors = true;
                }

                if (newSocials.linkedin.includes('linkedin.com/in/')) {
                        newSocials.linkedin = newSocials.linkedin.split('linkedin.com/in/')[1];
                }
                if (!usernamePattern.test(newSocials.linkedin) && newSocials.linkedin !== '') {
                        updateError('linkedin', 'Nome de utilizador inválido');
                        hasErrors = true;
                }

                if (!websitePattern.test(newSocials.website) && newSocials.website !== '') {
                        updateError('website', 'Website inválido');
                        hasErrors = true;
                }

                if (hasErrors) return;

                console.log(newSocials)
                updateUser(newSocials)
        }


        return (
                <section className=" bg-gray-100/50 ">
                        <div className="container max-w-6xl mx-auto px-3 md:px-12 pb-16">

                                {isLoading ?
                                        (
                                                <>
                                                        <div className="h-64 flex items-center justify-center">
                                                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
                                                        </div>
                                                </>
                                        ) : (
                                                <div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
                                                        <div className="items-top w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                                                                <div className="max-w-xl md:max-w-sm mx-auto md:w-1/3 pr-5">
                                                                        <h3 className="text-gray-800 text-bold text-xl">Redes Sociais</h3>
                                                                        <span className="text-sm">Preencha os campos com os links das suas redes sociais e do seu website/portfolio, de modo a dar a conhecer o seu trabalho para o público e futuros clientes.</span>
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
                                                                                                        defaultValue={user.social.facebook ? user.social.facebook : ''}
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
                                                                                                        defaultValue={user.social.instagram ? user.social.instagram : ''}
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
                                                                                                        defaultValue={user.social.pinterest ? user.social.pinterest : ''}
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
                                                                                                        defaultValue={user.social.linkedin ? user.social.linkedin : ''}
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
                                                                                                        defaultValue={user.social.website ? user.social.website : ''}
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
                                        )}
                        </div>
                </section>
        )
}
