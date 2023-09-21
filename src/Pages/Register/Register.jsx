import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import { RegisterUserForm } from "./RegisterUserForm"
import { RegisterSupplierForm } from "./RegisterSupplierForm"
import './Register.css'


export default function Register() {
    const [activeTab, setActiveTab] = useState('user');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">



                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2 flex-grow">
                            <button
                                className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-200 ${activeTab === 'user' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} `}
                                onClick={() => handleTabChange('user')}>
                                Utilizador
                            </button>
                        </li>
                        <li className="mr-2 flex-grow">
                            <button
                                className={`inline-block p-4 border-b-2 rounded-t-lg ease-in duration-200 ${activeTab === 'supplier' ? 'text-orange-400  border-orange-400 hover:text-orange-500 hover:border-orange-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} `}
                                onClick={() => handleTabChange('supplier')}>
                                Fornecedor
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="self-start text-xl font-bold text-slate-900 sm:text-3xl ">
                    Registar
                </div>

                <div className="mt-10">
                    {activeTab === 'user' ? (
                        <RegisterUserForm />
                    ) : (
                        <RegisterSupplierForm />
                    )}
                </div>

                <div className="gap-1 flex items-center justify-start mt-2 text-sm text-red-500 sm:text-sm">
                    * Campos obrigatórios
                </div>

            </div>

        </>
    )
}
