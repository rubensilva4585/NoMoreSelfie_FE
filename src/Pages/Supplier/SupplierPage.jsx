import { AiOutlineHeart } from 'react-icons/ai';
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaMapPin, FaPinterest } from 'react-icons/fa'
import ImageGallery from "react-image-gallery";
import SupplierPageService from './SupplierPageService';

export default function SupplierPage() {
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];


    return (
        <section className=" bg-gray-100/50">

            {/* <div className="container mx-auto px-3 md:px-12 py-20"> */}
            {/* <div className="container mx-auto px-3 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"> */}
            <div className="container mx-auto px-3 md:px-12 py-20 flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-[1fr, 1fr, 1fr] gap-8">

                <div className='rounded-lg lg:block lg:col-span-2 h-100'>
                    <ImageGallery items={images}
                        // onClick={this._onImageClick.bind(this)}
                        // onImageLoad={this._onImageLoad}
                        // onSlide={this._onSlide.bind(this)}
                        // onPause={this._onPause.bind(this)}
                        // onScreenChange={this._onScreenChange.bind(this)}
                        // onPlay={this._onPlay.bind(this)}
                        infinite={true}
                        showBullets={true}
                        showFullscreenButton={true}
                        useBrowserFullscreen={false}
                        showPlayButton={true}
                        showThumbnails={true}
                        showIndex={true}
                        showNav={true}
                        thumbnailPosition={"bottom"}
                        slideDuration={parseInt(500)}
                        slideInterval={parseInt(450)}
                        slideOnThumbnailOver={true}
                        useWindowKeyDown={true}
                    />
                    <hr className='my-8' />
                    {/* Descricao */}
                    <div className='bg-white rounded-lg p-5 shadow-lg border border-gray-200'>

                        <div className=' '>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Descrição</h1>
                            <div id="service_description text-gray-600">
                                <p className="">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor magnam expedita incidunt consequatur, iste ut sequi nihil quidem odio suscipit illum, asperiores fugit rerum a tempora. Repellat ad iure dignissimos!
                                </p>
                                <br />
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                        </div>

                        <hr className='my-8' />
                        {/* Distritos */}
                        <div className=''>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Distritos</h1>
                            <div id="service_districts" className="text-gray-600 w-full flex overflow-x-scroll items-center text-lg rounded-lg p-2 bg-gray-100/50">
                                <div className=''>
                                    Porto
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Lisboa
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                                <div className='mx-4 text-gray-600'>|</div>
                                <div className=''>
                                    Braga
                                </div>
                            </div>
                        </div>

                        <hr className='my-8' />

                        {/* Servicos e Precos */}
                        <div className=''>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Serviços e Preços</h1>
                            <div className="grid sm:grid-cols-2 sm:grid-rows-[1fr,1fr] lg:grid-cols-3 lg:grid-rows-[1fr,1fr,1fr] gap-4">
                                <SupplierPageService />
                                <SupplierPageService />
                                <SupplierPageService />
                                <SupplierPageService />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="order-first lg:order-none lg:col-span-1">
                    <div className="p-4 bg-white shadow-lg rounded-2xl space-y-6">
                        <div className="text-center my-4">
                            <img className="h-32 w-32 rounded-full border-4 border-white mx-auto my-2"
                                src="https://www.tailwind-kit.com/images/person/6.jpg" alt="" />
                            <div className='mb-2'>
                                <h3 className="font-bold text-3xl text-gray-800">João Alves</h3>
                                <div className="inline-flex text-gray-700 items-center">
                                    <svg className="h-4 w-4 text-gray-400 mr-1" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path className=""
                                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    </svg>
                                    Porto
                                </div>
                            </div>
                            <div className='h-1 w-10 bg-orange-400 mx-auto' />
                        </div>
                        <div className="w-full p-2 bg-orange-100/50 rounded-lg">
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
                        </div>

                        <div>
                            <p className="text-gray-600 text-center">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque soluta voluptas veniam nisi beatae similique quibusdam dolorem? Nulla, consequuntur neque?
                            </p>
                        </div>

                        <div className="flex items-center justify-around text-xs text-gray-400">
                            <p className="flex text-center flex-col">
                                Email
                                <span className="font-bold text-center text-black">
                                    testemail@gmail.com
                                </span>
                            </p>
                            <p className="flex text-center flex-col">
                                Telefone
                                <span className="font-bold text-center text-black">
                                    912345678
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 justify-between w-40 pt-4 mx-auto text-gray-500 border-t border-gray-200 text-3xl">
                            <a href="#">
                                <FaFacebook />
                            </a>
                            <a href="#">
                                <FaInstagram />
                            </a>
                            <a href="#">
                                <FaPinterest />
                            </a>
                            <a href="#">
                                <FaLinkedin />
                            </a>
                            <a href="#">
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

        </section >
    )
}