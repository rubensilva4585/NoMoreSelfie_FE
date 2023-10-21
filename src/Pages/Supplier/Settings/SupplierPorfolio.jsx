import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SupplierPorfolioFormImgUpload from './SupplierPorfolioFormImgUpload';

export default function SupplierPorfolio(props) {

        return (
                <section className=" bg-gray-100/50 ">
                        <div className="container max-w-6xl mx-auto px-3 md:px-12 pb-16">
                                <div className="space-y-6 bg-white border-t-2 border-orange-400 rounded-lg">
                                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:space-y-0">
                                                <div className="">
                                                        <h3 className="text-gray-800 text-bold text-xl">Portfolio</h3>
                                                        <span className="text-sm">Chame a atenção dos compradores certos com exemplos visuais dos seus serviços.</span>
                                                </div>

                                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
                                                        </div>
                                                        <div>
                                                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                                                        </div>
                                                </div>


                                        </div>
                                </div>
                                <hr />

                                <div className="space-y-6 bg-white">
                                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:space-y-0">
                                                <div className="">
                                                        <h3 className="text-gray-800 text-bold text-xl">Adicionar Imagens</h3>
                                                        <span className="text-sm">Chame a atenção dos compradores certos com exemplos visuais dos seus serviços.</span>
                                                </div>
                                                <div className="flex flex-col gap-4 pt-4">

                                                        <SupplierPorfolioFormImgUpload />
                                                </div>
                                        </div>
                                </div>

                                {/* <div className="items-center w-full p-6 m-0 text-gray-500 ">
                                        <div className="w-full flex justify-between">
                                                <Link to="/supplier/services/" className="flex gap-2 justify-center items-center text-gray-400 hover:text-black">
                                                        <FaArrowLeft /> Voltar para a lista de serviços
                                                </Link>
                                                <button
                                                        type="submit"
                                                        className="py-2.5 px-4 text-green-400 border-green-400 border hover:bg-green-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                        'Criar Serviço'
                                                </button>
                                        </div>
                                </div> */}
                        </div>
                </section>
        )
}
