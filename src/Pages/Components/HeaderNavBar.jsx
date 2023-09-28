import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function HeaderNavBar() 
{
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const profileMenuRef = useRef(null); 
    const home = useLocation().pathname === "/";


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
      function handleClickOutside(event) {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
      }
      
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    const toggleBurgerMenu = () => {
        setBurgerMenuOpen(!burgerMenuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const scrollToSection = () => {
        const target = document.getElementById('sobre');
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
        });
    };

    return (     
        <div className="relative h-screen overflow-hidden bg-gray-900">
            <img src="../../../images/wallpaper1.jpg" className="absolute object-cover w-full h-full"/>
            {/* Image filter */}
            <div className="absolute inset-0 bg-black opacity-25">
            </div>
            <header className={`top-0 left-0 right-0 z-20 transition ease-in duration-200 ${isScrolled ? 'bg-white text-black fixed w-full shadow-md' : 'absolute text-white'}`}>
                <nav className="container px-6 py-4 mx-auto md:px-12">
                    <div className="items-center justify-between md:flex">
                        <div className="flex items-center justify-between">
                            <a href="#">
                                NoMoreSelfie
                            </a>
                            <div className="md:hidden">
                                <button className="focus:outline-none" onClick={toggleBurgerMenu}>
                                    <FaBars size={30} />
                                </button>
                            </div>
                        </div>
                        <div className="items-center hidden md:flex">
                            <Link to="/" className="mx-3 text-lg uppercase cursor-pointer hover:text-orange-400">
                                Página Inicial
                            </Link>
                            <Link to="/search" className="mx-3 text-lg uppercase cursor-pointer hover:text-orange-400">
                                Fornecedores
                            </Link>
                            
                            {/* Login / Menu perfil */}
                            <div class="block">
                                <div class="flex items-center ml-4 md:ml-6">
                                    <div class="relative ml-3">
                                        <div class="relative inline-block text-left">
                                            <div ref={profileMenuRef}>
                                                <button onClick={toggleProfileMenu} type="button" className={ `flex items-center justify-center w-full rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none`} id="options-menu">
                                                    {/* <svg width="20" fill="currentColor" height="20" class="text-gray-800" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                                        </path>
                                                    </svg> */}
                                                    <a href="#" className="relative block">
                                                        <img alt="profil" src="https://www.tailwind-kit.com/images/person/6.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                    </a>
                                                    <div className="flex items-start justify-center flex-col ml-4">
                                                        <p className="text-gray-800 font-medium">
                                                            Zeca Afonso
                                                        </p>
                                                        <span className="text-sm">
                                                            Profissional
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Profile menu */}
                                            {profileMenuOpen && (
                                                <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <Link to="/settings">
                                                            <a href="#" class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                                <span class="flex flex-col">
                                                                    <span>
                                                                        Gerir Conta
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </Link>
                                                        <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                            <span class="flex flex-col">
                                                                <span>
                                                                    Sair
                                                                </span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


            {/* BurgerMenu */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white transition-transform transform ${burgerMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-30`}>
                <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
                    <a href="#" className="text-xl font-bold text-orange-400">
                        NoMoreSelfie
                    </a>
                    <button className="focus:outline-none md:hidden" onClick={toggleBurgerMenu}>
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-500">
                                    Menu
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16">
                                        </path>
                                    </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">
                                    Página Inicial
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16">
                                        </path>
                                    </svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">
                                    Fornecedores
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="px-5 py-3">
                    <a href="#" className="flex items-center justify-center w-full h-11 px-6 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400">
                        Login
                    </a>
                </div>
            </div>

            {/* Hero */}
            <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
                    <span className="font-bold text-orange-400 uppercase">
                        NoMoreSelfie
                    </span>
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
        </div>

)}
