import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HeaderNavBar from "./HeaderNavBar";

export default function Header() 
{
    const home = useLocation().pathname === "/";

    const scrollToSection = () => {
        const target = document.getElementById('sobre');
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
        });
    };

    return (     
        <div className={`relative ${home ? ' h-screen overflow-hidden bg-gray-900' : 'h-16'}`}>
            { home && (
                <>
                    <img src="../../../images/wallpaper1.jpg" className="absolute object-cover w-full h-full"/>
                    {/* Image filter */}
                    <div className="absolute inset-0 bg-black opacity-25">
                    </div>
                </>
            )}

            <HeaderNavBar home={home}/>

            { home && (
                <>
                    {/* Hero */}
                    <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                        <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
                            <h1 className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl">
                                Capture Momentos
                                <br/>
                                Inesquecíveis
                            </h1>
                            <button onClick={scrollToSection} className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100 scroll-button">
                                Começar agora
                            </button>
                        </div>
                    </div>
                    {/* Scroll Button */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <button onClick={scrollToSection} className="block text-white text-center hover:text-gray-300">
                            <FaAngleDown size={30} />
                        </button>
                    </div>
                </>
            )}
        </div>

)}
