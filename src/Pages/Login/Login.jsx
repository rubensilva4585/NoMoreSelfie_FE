import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF, FaSpinner } from "react-icons/fa"
import './Login.css'
import { Link, useNavigate } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  // states
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [valuesError, setValuesError] = useState({
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // functions
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const inputsValidation = () => {
    let isValid = true;

    setValuesError({
      email: "",
      password: ""
    });

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

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!inputsValidation()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      const token = response.data.authorization.token;
      const userId = response.data.user.id;
      // const role = response.data.authorization.token;
      console.log('Token de login:', token);
      console.log('User ID:', userId);

      Cookies.set('token', token, { secure: true, sameSite: 'strict' });
      Cookies.set('userId', userId, { secure: true, sameSite: 'strict' });
      Cookies.set('role', "user", { secure: true, sameSite: 'strict' });

      console.log(Cookies.get('token'), Cookies.get('userId'), Cookies.get('role'));
      navigate('/');

    } catch (error) {
      if (error.response) {
        if (error.response.data.email) {
          setValuesError((prevErrors) => ({
            ...prevErrors,
            email: error.response.data.email
          }));
        }
        if (error.response.data.password) {
          setValuesError((prevErrors) => ({
            ...prevErrors,
            password: error.response.data.password
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
            <div>
              <h1 className="text-center text-3xl xl:text-4xl font-light">
                NoMoreSelfie
              </h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-bold">
                Entre na sua conta
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-orange-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-1 rounded-full">
                      <FcGoogle className="text-xl" />
                    </div>
                    <span className="ml-4">
                      Continue com Google
                    </span>
                  </button>

                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-orange-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                      <FaFacebookF className="text-xl text-blue-600" />
                    </div>
                    <span className="ml-4">
                      Continue com Facebook
                    </span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none p-1 px-3 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Entrar com email
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <form action="#" autoComplete="off" onSubmit={handleSubmit}>
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${valuesError.email ? 'border-red-500' : 'border-gray-200'
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
                          onClick={handleClickShowPassword}
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
                        <span>Entrar</span>
                      )}
                    </button>
                  </form>
                  <p className="mt-2 text-xs text-gray-400">
                    Não tem uma conta?
                    <Link to="/signin" className="text-orange-400 hover:text-orange-600 ml-1">
                      Registe-se
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

      {/* <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
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

            </div> */}

    </>
  )
}
