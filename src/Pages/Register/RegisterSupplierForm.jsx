import { useState } from "react"
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export function RegisterSupplierForm() {

    const [showPassword, setShowPassword] = useState('password');

    const handleShowPassword = () => {
        setShowPassword(showPassword === 'password' ? 'text' : 'password');
    };

    return (
        <>
            <form action="#" autoComplete="off">

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="first_name"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="first_name"
                            placeholder="Primeiro nome *" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="last_name"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="last_name"
                            placeholder="Último nome *" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="company"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="company"
                            placeholder="Empresa" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="email"
                            placeholder="Email *" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="tel"
                            pattern="^[29]\d{8}$"
                            id="phone"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="phone"
                            placeholder="Telefone *" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="nif"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="nif"
                            placeholder="NIF *" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="address"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="address"
                            placeholder="Morada" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <button
                            type="button"
                            className="absolute transform -translate-y-1/2 top-1/2 right-4"
                            onClick={handleShowPassword}>

                            {showPassword === 'password' ? (
                                <AiFillEyeInvisible className="text-xl text-gray-400" />
                            ) : (
                                <AiFillEye className="text-xl text-gray-400" />
                            )}
                        </button>
                        <input
                            type={showPassword}
                            id="password"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="password"
                            placeholder="Password *" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="relative">
                        <button
                            type="button"
                            className="absolute transform -translate-y-1/2 top-1/2 right-4"
                            onClick={handleShowPassword}>

                            {showPassword === 'password' ? (
                                <AiFillEyeInvisible className="text-xl text-gray-400" />
                            ) : (
                                <AiFillEye className="text-xl text-gray-400" />
                            )}
                        </button>
                        <input
                            type={showPassword}
                            id="confirm_password"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="confirm_password"
                            placeholder="Confirmar Password *" />
                    </div>
                </div>


                <div className="flex flex-col gap-2.5 mt-6">
                    <div className="flex w-full">
                        <button
                            type="submit"
                            className="py-3.5 px-5 bg-orange-400 hover:bg-orange-500 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                            Registar
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
}
