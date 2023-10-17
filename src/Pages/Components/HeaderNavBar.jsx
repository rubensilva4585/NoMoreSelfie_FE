import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderNavBar({ home = false }) {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const profileMenuRef = useRef(null);
    const token = Cookies.get('token') ? Cookies.get('token') : null;

    const navigate = useNavigate();

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

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <>
            <header
                className={`
                    ${home
                        ? `top-0 left-0 right-0 z-30 transition ease-in duration-200 ${isScrolled ? 'bg-white text-black fixed w-full shadow-md' : 'absolute text-white'}`
                        : 'bg-white text-black fixed w-full shadow-md z-30'}` }>
                <nav className={`container px-6 ${token ? 'py-2' : 'py-4'} mx-auto md:px-12`}>
                    <div className="items-center justify-between md:flex">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="text-center text-xl xl:text-2xl text-orange-400">
                                NoMoreSelfie
                            </Link>
                            <div className="md:hidden">
                                <button className="focus:outline-none" onClick={toggleBurgerMenu}>
                                    <FaBars size={30} />
                                </button>
                            </div>
                        </div>
                        <div className="items-center hidden md:flex">
                            <Link to="/" className="mx-3 text-md uppercase cursor-pointer hover:text-orange-400">
                                Página Inicial
                            </Link>
                            <Link to="/search" className="mx-3 text-md uppercase cursor-pointer hover:text-orange-400">
                                Fornecedores
                            </Link>

                            {/* Login / Menu perfil */}
                            <div className="block">
                                <div className="flex items-center ml-4 md:ml-6">
                                    <div className="relative ml-3">
                                        <div className="relative inline-block text-left">
                                            {/* Profile dropdown */}
                                            {token
                                                ? (
                                                    <>
                                                        <div ref={profileMenuRef}>
                                                            <button onClick={toggleProfileMenu} type="button" className={`flex items-center justify-center w-full rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none`} id="options-menu">
                                                                <a href="#" className="relative block">
                                                                    <img alt="profil" src="https://www.tailwind-kit.com/images/person/6.jpg" className="mx-auto object-cover rounded-full h-10 w-10" />
                                                                </a>
                                                                <div className="flex items-start justify-center flex-col ml-4">
                                                                    <p className="text-gray-800 font-medium ">
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
                                                            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                                                <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                                    <Link to="/supplier/services" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                                            <span className="flex flex-col">
                                                                                <span>
                                                                                    Gerir Serviços
                                                                                </span>
                                                                            </span>
                                                                    </Link>
                                                                    <Link to="/settings" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                                            <span className="flex flex-col">
                                                                                <span>
                                                                                    Gerir Conta
                                                                                </span>
                                                                            </span>
                                                                    </Link>
                                                                    <a href="#" className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
                                                                        onClick={handleLogout}
                                                                    >
                                                                        <span className="flex flex-col">
                                                                            <span>
                                                                                Sair
                                                                            </span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                                : (
                                                    <div className="flex items-center">
                                                        <Link to="/login" className="bg-orange-400 px-4 py-2 rounded text-white hover:bg-orange-500 text-sm">
                                                            Aceder
                                                        </Link>
                                                        <Link to="/signin" className={`${isScrolled || !home ? 'text-black' : 'text-white'} text-sm px-4 py-2`}>
                                                            Registe-se
                                                        </Link>
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
                                    Profissionais
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
        </>
    )
}
