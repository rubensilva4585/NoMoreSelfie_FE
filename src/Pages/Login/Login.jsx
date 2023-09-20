import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import './Login.css'

export default function Login() {
    const [count, setCount] = useState(0)

    return (
        <>

            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-start text-xl font-bold text-slate-900 sm:text-3xl ">
                    Bem-Vindo
                </div>
                <div className="mt-10">
                    <form action="#" autoComplete="off">

                        <div className="flex flex-col mb-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                    name="email"
                                    placeholder="Email" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                    name="password"
                                    placeholder="Password" />
                            </div>
                        </div>

                        <div className="flex items-center mt-2">
                            <div className="flex ml-auto">
                                <a href="#" className="inline-flex text-sm text-gray-400 sm:text-sm  hover:text-gray-600">
                                    Esqueceu-se da sua password?
                                </a>
                            </div>
                        </div>

                        <div class="relative my-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-200">
                                </div>
                            </div>
                            <div class="relative flex justify-center text-sm leading-5">
                                <span class="px-6 text-gray-400 bg-white">
                                    OR
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="flex flex-col">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="relative flex items-center justify-center rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 transition ease-in duration-200 bg-white font-medium text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 hover:bg-gray-100  focus:ring-offset-orange-200 focus:ring-orange-400 focus:border-transparent focus:ring-offset-2"
                                        placeholder="Password">
                                        <div className="absolute left-4">
                                            <FcGoogle className="text-xl" />
                                        </div>
                                        Continue com Google
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="relative flex items-center justify-center rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 transition ease-in duration-200 bg-white font-medium text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 hover:bg-gray-100  focus:ring-offset-orange-200 focus:ring-orange-400 focus:border-transparent focus:ring-offset-2"
                                        placeholder="Password">
                                        <div className="absolute left-4">
                                            <FaFacebookF className="text-xl text-blue-600" />
                                        </div>
                                        Continue com Facebook
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button
                                    type="submit"
                                    className="py-3.5 px-5 bg-orange-400 hover:bg-orange-500 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                    Login
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="gap-1 flex items-center justify-start mt-2 text-sm text-gray-400 sm:text-sm">
                    Não tem uma conta? <span> <a href="#" className="text-orange-400 hover:text-orange-600"> Registe-se </a> </span>
                </div>

            </div>

        </>
    )
}
