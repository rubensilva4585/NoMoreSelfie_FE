import { AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaMapPin, FaPinterest } from 'react-icons/fa'
import ImageGallery from "react-image-gallery";
import PageSupplierService from './PageSupplierService';
import { getSupplierImagesById, getSupplierServicesById, getUserById } from '../../API/General';
import { IMAGE_STORAGE_PATH } from '../../constants/General';


export default function PageSupplier() {
    const [supplierData, setSupplierData] = useState(null)
    const [supplierServicesData, setSupplierServicesData] = useState(null)
    const [supplierImages, setSupplierImages] = useState([
        {
            original: "../../../images/noimage.png",
            thumbnail: "../../../images/noimage.png",
        }
    ])
    const [isLoading, setIsLoading] = useState(true)
    const { supplier_id } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        try {
            getUserById(supplier_id)
                .then((data) => {
                    setSupplierData(data);
                })
                .catch((error) => {
                        //alert("Erro ao carregar pagina")
                        console.log("Erro API: ", error)
                        window.location.replace("/error404")
                });

            getSupplierImagesById(supplier_id)
                .then((data) => {
                    console.log(data);
                    data.length > 0 &&
                        setSupplierImages(data.map((image) => {
                            return {
                                original: IMAGE_STORAGE_PATH + image.path,
                                thumbnail: IMAGE_STORAGE_PATH + image.path,
                            }
                        }));
                })
                .catch((error) => {
                    throw error;
                });

            getSupplierServicesById(supplier_id)
                .then((data) => {
                    // console.log(data);
                    setSupplierServicesData(data);
                })
                .catch((error) => {
                    throw error;
                });
                
        } catch (error) {
            alert("Erro ao carregar pagina")
            console.log("Erro geral: ", error);
        } finally {
            setIsLoading(false);
        }

        return () => {
            abortController.abort();
        };
    }, [])

    return (
        <section className=" bg-gray-100/50">
            {isLoading ?
                (
                    <>
                        <div className="h-screen flex items-center justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50"></div>
                        </div>
                    </>
                ) : (
                    <div className="container mx-auto px-3 md:px-12 py-20 flex flex-col lg:grid lg:grid-cols-3 gap-8">
                        <div className='rounded-lg lg:block lg:col-span-2 h-100'>
                            <ImageGallery items={supplierImages}
                                // onClick={this._onImageClick.bind(this)}
                                // onImageLoad={this._onImageLoad}
                                // onSlide={this._onSlide.bind(this)}
                                // onPause={this._onPause.bind(this)}
                                // onScreenChange={this._onScreenChange.bind(this)}
                                // onPlay={this._onPlay.bind(this)}
                                infinite={true}
                                showBullets={true}
                                showFullscreenButton={true}
                                useBrowserFullscreen={true}
                                showPlayButton={true}
                                showThumbnails={true}
                                showIndex={true}
                                showNav={true}
                                thumbnailPosition={"bottom"}
                                slideDuration={parseInt(500)}
                                slideInterval={parseInt(2000)}
                                slideOnThumbnailOver={true}
                                useWindowKeyDown={true}
                            />
                            <hr className='my-8' />
                            {/* Descricao */}
                            <div className='bg-white rounded-lg p-5 shadow-lg border border-gray-200'>

                                <div className=' '>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Descrição</h1>
                                    <div id="service_description" className="text-gray-600 prose" dangerouslySetInnerHTML={{ __html: supplierData && supplierData.service_description }}>
                                    </div>
                                </div>

                                <hr className='my-8' />
                                {/* Distritos */}
                                <div className=''>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Distritos</h1>
                                    <div id="service_districts" className="text-gray-600 w-full flex overflow-x-auto items-center text-lg rounded-lg p-2 bg-gray-100/50">
                                        <div className=''>
                                            Porto
                                        </div>
                                        <div className='mx-4 text-gray-600'>|</div>
                                        <div className=''>
                                            Aveiro
                                        </div>
                                        <div className='mx-4 text-gray-600'>|</div>
                                        <div className=''>
                                            Braga
                                        </div>
                                        <div className='mx-4 text-gray-600'>|</div>
                                        <div className=''>
                                            Coimbra
                                        </div>
                                    </div>
                                </div>

                                <hr className='my-8' />

                                {/* Servicos e Precos */}
                                <div className=''>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Serviços e Preços</h1>
                                    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                                        {supplierServicesData && supplierServicesData.map((service, index) => {
                                            return (
                                                <PageSupplierService
                                                    key={index}
                                                    service={service}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-first lg:order-none lg:col-span-1">
                            <div className="p-4 bg-white shadow-lg rounded-2xl space-y-6">
                                <div className="text-center my-4">
                                    <div className='h-32 w-32 rounded-full border-2 p-1 border-orange-400 mx-auto my-2 overflow-hidden'>
                                    <img className="object-cover w-full h-full rounded-full"
                                        src={supplierData && supplierData.avatar ? IMAGE_STORAGE_PATH + supplierData.avatar : './../../images/noavatar.svg'} alt="" />
                                    </div>
                                    <div className='mb-2'>
                                        <h3 className="font-bold text-3xl text-gray-800">{supplierData && supplierData.name}</h3>
                                        <div className="inline-flex text-gray-700 items-center">
                                            <svg className="h-4 w-4 text-gray-400 mr-1" fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path className=""
                                                    d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                            </svg>
                                            {supplierData && supplierData.district.name}
                                        </div>
                                    </div>
                                    <div className='h-1 w-10 bg-orange-400 mx-auto' />
                                </div>
                                {/* <div className="w-full p-2 bg-orange-100/50 rounded-lg">
                                    <div className="flex items-center justify-around text-xs text-gray-400">
                                        <p className="flex text-center flex-col">
                                            Data registo
                                            <span className="font-bold text-center text-black">
                                                12/01/2021
                                            </span>
                                        </p>
                                        <p className="flex text-center flex-col">
                                            Serviços
                                            <span className="font-bold text-center text-black">
                                                13
                                            </span>
                                        </p>
                                        <p className="flex text-center flex-col">
                                            Visitantes
                                            <span className="font-bold text-center text-black">
                                                3234
                                            </span>
                                        </p>
                                    </div>
                                </div> */}

                                <div>
                                    <p className="text-gray-600 text-center">
                                        {supplierData && supplierData.bio}
                                    </p>
                                </div>

                                <div className="flex items-center justify-around text-xs text-gray-400">
                                    <p className="flex text-center flex-col">
                                        Email
                                        <span className="font-bold text-center text-black">
                                            {supplierData && supplierData.email}
                                        </span>
                                    </p>
                                    <p className="flex text-center flex-col">
                                        Telefone
                                        <span className="font-bold text-center text-black">
                                            {supplierData && supplierData.phone}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 justify-between w-40 pt-4 mx-auto text-gray-500 border-t border-gray-200 text-3xl">
                                    <a href={`https://facebook.com/${supplierData && supplierData.social.facebook}`} target="_blank">
                                        <FaFacebook />
                                    </a>
                                    <a href={`https://instagram.com/${supplierData && supplierData.social.instagram}`} target="_blank">
                                        <FaInstagram />
                                    </a>
                                    <a href={`https://pinterest.com/${supplierData && supplierData.social.pinterest}`} target="_blank">
                                        <FaPinterest />
                                    </a>
                                    <a href={`https://linkedin.com/in/${supplierData && supplierData.social.linkedin}`} target="_blank">
                                        <FaLinkedin />
                                    </a>
                                    <a href={`https://${supplierData && supplierData.social.website}`} target="_blank">
                                        <FaLink />
                                    </a>
                                </div>

                                <div className="flex items-center justify-between gap-4 mt-6">
                                    <button
                                        className="py-2 transition ease-in duration-200 text-orange-500 uppercase rounded-md hover:bg-orange-400 hover:text-white border border-orange-400 focus:outline-none w-full"
                                    >
                                        Pedir informação
                                    </button>
                                    <button type="button" className="w-fit px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 ">
                                        <AiOutlineHeart
                                            className={`text-orange-400 hover:text-white drop-shadow-md text-2xl transition duration-200 ease-in-out`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }

        </section >
    )
}