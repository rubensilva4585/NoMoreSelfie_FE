import { useState } from "react"
import { AiFillCalendar } from 'react-icons/ai'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF, FaSpinner } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';

export function RegisterSupplier() {
        const [selectedDate, setSelectedDate] = useState(null);

        // states
        const [values, setValues] = useState({
                name: "",
                company: "",
                nif: "",
                address: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: "",
                showPassword: false,
                showConfirmPassword: false,
        });
        const [valuesError, setValuesError] = useState({
                name: "",
                company: "",
                nif: "",
                address: "",
                phone: "",
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
        };
        const handleChangeNIF = () => (e) => {
                let input = e.target.value.replace(/\D/g, '');
                input = input.slice(0, 9);

                e.target.value = input;
                setValues({ ...values, nif: input });
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
                        company: "",
                        nif: "",
                        address: "",
                        phone: "",
                        email: "",
                        password: "",           
                        confirmPassword: "",
                });

                if (!values.company) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                company: 'Empresa é obrigatória'
                        }));
                        isValid = false;
                }

                if (!values.nif || values.nif.length < 9) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                nif: 'NIF inválido'
                        }));
                        isValid = false;
                }

                if (!values.address) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                address: 'Morada é obrigatória'
                        }));
                        isValid = false;
                }

                if (!values.phone || values.phone.length < 9 || !/^\d+$/.test(values.phone)) {
                        setValuesError((prevErrors) => ({
                                ...prevErrors,
                                phone: 'Telefone inválido'
                        }));
                        isValid = false;
                }

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
                                //phone: values.phone,  // verificar se aceita null
                                // company: values.company,
                                // nif: values.nif,
                                // address: values.address,
                                role: "supplier",
                                email: values.email,
                                password: values.password,
                        });

                        console.log(response.data);

                        const token = response.data.authorization.token;
                        const userId = response.data.user.id;
                        // // const role = response.data.authorization.token;
                        console.log('Token de login:', token);
                        console.log('User ID:', userId);

                        Cookies.set('token', token, { secure: true, sameSite: 'strict' });
                        Cookies.set('userId', userId, { secure: true, sameSite: 'strict' });
                        Cookies.set('role', "supplier", { secure: true, sameSite: 'strict' });

                        console.log(Cookies.get('token'), Cookies.get('userId'), Cookies.get('role'));

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
                                        <div className="relative flex-1 bg-black text-center hidden lg:flex">
                                                <img src="../../../images/wallpaperlogin.jpg" className="absolute object-cover w-full h-full" />
                                                <div className="absolute inset-0 bg-black opacity-25" />
                                        </div>
                                        <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
                                                <div>
                                                        <h1 className="text-center text-3xl xl:text-4xl font-light">
                                                                NoMoreSelfie
                                                        </h1>
                                                </div>
                                                <div className="mt-8 flex flex-col items-center">
                                                        <h1 className="text-xl xl:text-2xl font-bold">
                                                                Crie a sua conta profissional
                                                        </h1>
                                                        <div className="w-full flex-1 mt-8">
                                                                
                                                                <div className="mx-auto max-w-sm">
                                                                        <form action="#" autoComplete="off" onSubmit={handleSubmit}>
                                                                                <input
                                                                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.company ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="text"
                                                                                        id="company"
                                                                                        name="company"
                                                                                        placeholder="Empresa"
                                                                                        onChange={handleChange("company")}
                                                                                />
                                                                                {valuesError.company && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.company}</p>
                                                                                )}

                                                                                <input
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.name ? 'border-red-500' : 'border-gray-200'
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
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.phone ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="tel"
                                                                                        id="phone"
                                                                                        name="phone"
                                                                                        placeholder="Telefone"
                                                                                        onChange={handleChangePhone()}
                                                                                />
                                                                                {valuesError.phone && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.phone}</p>
                                                                                )}

                                                                                <input
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.nif ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="text"
                                                                                        id="nif"
                                                                                        name="nif"
                                                                                        placeholder="NIF"
                                                                                        onChange={handleChangeNIF()}
                                                                                />
                                                                                {valuesError.nif && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.nif}</p>
                                                                                )}
                                                                                
                                                                                <input
                                                                                        className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.address ? 'border-red-500' : 'border-gray-200'
                                                                                                } placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
                                                                                        type="text"
                                                                                        id="address"
                                                                                        name="address"
                                                                                        placeholder="Vive em..."
                                                                                        onChange={handleChange("address")}
                                                                                />
                                                                                {valuesError.address && (
                                                                                        <p className="text-red-500 text-xs mt-1">{valuesError.address}</p>
                                                                                )}
                                                                                
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
                                                                        <p className="mt-2 text-xs text-gray-400">
                                                                                Já tem uma conta?
                                                                                <Link to="/login" className="text-orange-400 hover:text-orange-600 ml-1">
                                                                                        Iniciar sessão
                                                                                </Link>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                </div>
                        </div>

                        {/* <form action="#" autoComplete="off">

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
                            placeholder="Telefone" />
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <div className="relative">
                        <div className="absolute transform -translate-y-1/2 top-1/2 right-4">
                            <AiFillCalendar className="text-xl text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="date_of_birth"
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                            name="date_of_birth"
                            placeholder="Data de nascimento" />
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

            </form> */}
                </>
        )
}
