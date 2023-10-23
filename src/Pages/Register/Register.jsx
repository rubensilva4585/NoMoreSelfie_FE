import { useState } from "react"
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF, FaSpinner } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Register() {
        const [selectedDate, setSelectedDate] = useState(null);

        // states
        const [values, setValues] = useState({
                name: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: "",
                showPassword: false,
                showConfirmPassword: false,
        });
        const [valuesError, setValuesError] = useState({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
        });
        const [isSubmitting, setIsSubmitting] = useState(false);
        const navigate = useNavigate();


        // functions
        const handleClickShowPassword = (prop) => () => {
                setValues({ ...values, [prop]: !values[prop] });
        };

        const handleChange = (prop) => (e) => {
                setValues({ ...values, [prop]: e.target.value });
                console.log(values);
        };
        const handleChangePhone = () => (e) => {
                let input = e.target.value.replace(/\D/g, '');
                input = input.slice(0, 9);

                e.target.value = input;
                setValues({ ...values, phone: input });
        };

        const inputsValidation = () => {
                let isValid = true;

                setValuesError({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                });

                if (!values.name) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                name: 'Nome é obrigatório'
                        }));
                        isValid = false;
                }

                if (!values.email || !values.email.includes('@')) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                email: 'Email inválido'
                        }));
                        isValid = false;
                }

                if (!values.password || values.password.length < 6) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                password: 'Password deve ter pelo menos 6 caracteres'
                        }));
                        isValid = false;
                }

                if (!values.confirmPassword || values.confirmPassword.length < 6) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                confirmPassword: 'Password deve ter pelo menos 6 caracteres'
                        }));
                        isValid = false;
                }

                if (values.password !== values.confirmPassword) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                confirmPassword: 'As passwords não coincidem'
                        }));
                        isValid = false;
                }

                return isValid;
        }

        const handleSubmit = async (e) => {
                e.preventDefault();
                setIsSubmitting(true);

                if (!inputsValidation()) {
                        setIsSubmitting(false);
                        return;
                }

                try {
                        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
                                name: values.name,
                                phone: values.phone,  // verificar se aceita null
                                email: values.email,
                                password: values.password,
                        });

                        console.log(response.data);

                        const token = response.data.authorization.token;
                        sessionStorage.setItem("TOKEN", token);

                        navigate('/');
                } catch (error) {
                        console.log(error);
                        if (error.response) {
                                if (error.response.data.email) {
                                        setValuesError((prevErrors) => ({
                                                ...prevErrors,
                                                email: "Já existe uma conta com este email"
                                        }));
                                }
                        }
                        else if (error.request)
                                // METER POPUP DE ERRO
                                console.log("Error: Sem resposta do servidor", error.request);
                        else
                                console.log('Error', error.message);

                } finally {
                        setIsSubmitting(false);
                }
        };


        return (
                <>
                        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
                                        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                                                <Link to="/">
                                                        <h1 className="text-center text-3xl xl:text-4xl font-light">
                                                                NoMoreSelfie
                                                        </h1>
                                                </Link>
                                                <div className="mt-8 flex flex-col items-center">
                                                        <h1 className="text-xl xl:text-2xl font-bold">
                                                                Registe a sua conta
                                                        </h1>
                                                        <div className="w-full flex-1 mt-8">
                                                                <div className="flex flex-col items-center">
                                                                        <button className="w-full max-w-sm font-bold rounded-lg py-3 border-gray-200 hover:bg-gray-50 border text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                                                                <div className="bg-white p-1 rounded-full">
                                                                                        <FcGoogle className="text-xl" />
                                                                                </div>
                                                                                <span className="ml-4">
                                                                                        Continue com Google
                                                                                </span>
                                                                        </button>

                                                                        <button className="w-full max-w-sm font-bold rounded-lg py-3 border-gray-200 hover:bg-gray-50 border text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                                                                <div className="bg-white p-1 rounded-full">
                                                                                        <FaFacebookF className="text-xl text-blue-600" />
                                                                                </div>
                                                                                <span className="ml-4">
                                                                                        Continue com Facebook
                                                                                </span>
                                                                        </button>
                                                                </div>

                                                                <div className="mb-12 mt-6 border-b text-center">
                                                                        <div className="leading-none p-1 px-3 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                                                                                Registar com email
                                                                        </div>
                                                                </div>
                                                                <div className="mx-auto max-w-sm">
                                                                        <form action="#" autoComplete="off" onSubmit={handleSubmit}>
                                                                                <input
                                                                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.name ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="text"
                                                                                        id="name"
                                                                                        name="name"
                                                                                        placeholder="Nome e apelido"
                                                                                        onChange={handleChange("name")}
                                                                                />
                                                                                {valuesError.name && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.name}</p>
                                                                                )}

                                                                                <input
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="tel"
                                                                                        id="phone"
                                                                                        name="phone"
                                                                                        placeholder="Telefone"
                                                                                        onChange={handleChangePhone}
                                                                                />

                                                                                <input
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.email ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="email"
                                                                                        id="email"
                                                                                        name="email"
                                                                                        placeholder="Email"
                                                                                        onChange={handleChange("email")}
                                                                                // required
                                                                                />
                                                                                {valuesError.email && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.email}</p>
                                                                                )}


                                                                                <div className="relative">
                                                                                        {values.password && (
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="absolute transform top-1/2 right-4"
                                                                                                        onClick={handleClickShowPassword('showPassword')}
                                                                                                >
                                                                                                        {values.showPassword ? (
                                                                                                                <AiFillEyeInvisible className="text-xl text-gray-400" />
                                                                                                        ) : (
                                                                                                                <AiFillEye className="text-xl text-gray-400" />
                                                                                                        )}
                                                                                                </button>
                                                                                        )}
                                                                                        <input
                                                                                                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.password ? 'border-red-500' : 'border-gray-200'
                                                                                                        } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50 mt-5`}
                                                                                                type={values.showPassword ? 'text' : 'password'}
                                                                                                id="password"
                                                                                                name="password"
                                                                                                placeholder="Password"
                                                                                                onChange={handleChange("password")}
                                                                                        // required
                                                                                        />
                                                                                </div>
                                                                                {valuesError.password && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.password}</p>
                                                                                )}
                                                                                <div className="relative">
                                                                                        {values.confirmPassword && (
                                                                                                <button
                                                                                                        type="button"
                                                                                                        className="absolute transform top-1/2 right-4"
                                                                                                        onClick={handleClickShowPassword('showConfirmPassword')}
                                                                                                >
                                                                                                        {values.showConfirmPassword ? (
                                                                                                                <AiFillEyeInvisible className="text-xl text-gray-400" />
                                                                                                        ) : (
                                                                                                                <AiFillEye className="text-xl text-gray-400" />
                                                                                                        )}
                                                                                                </button>
                                                                                        )}
                                                                                        <input
                                                                                                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                                                                                        } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50 mt-5`}
                                                                                                type={values.showConfirmPassword ? 'text' : 'password'}
                                                                                                id="confirm_password"
                                                                                                name="confirm_password"
                                                                                                placeholder="Confirmar Password"
                                                                                                onChange={handleChange("confirmPassword")}
                                                                                        // required
                                                                                        />
                                                                                </div>
                                                                                {valuesError.confirmPassword && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.confirmPassword}</p>
                                                                                )}

                                                                                <div className="flex items-center mt-2">
                                                                                        <div className="flex ml-auto">
                                                                                                <Link
                                                                                                        to=""
                                                                                                        className="inline-flex text-xs text-gray-400 hover:text-gray-600"
                                                                                                >
                                                                                                        Esqueceu-se da sua password?
                                                                                                </Link>
                                                                                        </div>
                                                                                </div>
                                                                                <button
                                                                                        className="mt-5 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                                                                        type="submit"
                                                                                        disabled={isSubmitting}
                                                                                >
                                                                                        {isSubmitting ? (
                                                                                                <FaSpinner className="animate-spin -ml-1 h-5 w-5 text-white" />
                                                                                        ) : (
                                                                                                <span>Registar-me</span>
                                                                                        )}
                                                                                </button>
                                                                        </form>
                                                                        <p className="mt-2 text-sm text-gray-400 text-center">
                                                                                Já tem uma conta?
                                                                                <Link to="/login" className="text-orange-400 hover:text-orange-600 ml-1">
                                                                                        Iniciar sessão
                                                                                </Link>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="relative flex-1 bg-black text-center hidden lg:flex">
                                                <img src="../../../images/wallpaperlogin.jpg" className="absolute object-cover w-full h-full" />
                                                <div className="absolute inset-0 bg-black opacity-25" />
                                        </div>
                                </div>
                        </div>
                </>
        )
}
