import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { doRegister } from "../../API/Auth";
import { SESSION_TOKEN } from "../../constants/General";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

export default function Register() {
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
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// functions
	const handleClickShowPassword = (prop) => () => {
		setValues({ ...values, [prop]: !values[prop] });
	};

	const handleChange = (prop) => (e) => {
		setValues({ ...values, [prop]: e.target.value });
	};
	const handleChangePhone = () => (e) => {
		let input = e.target.value.replace(/\D/g, "");
		input = input.slice(0, 9);

		e.target.value = input;
		setValues({ ...values, phone: input });
	};

	const inputsValidation = () => {
		let isValid = true;

		setValuesError({
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		});

		if (!values.name) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				name: "Nome é obrigatório",
			}));
			isValid = false;
		}

		if (!values.email || !values.email.includes("@")) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				email: "Email inválido",
			}));
			isValid = false;
		}

		if (values.lenght > 0 && values.phone.length < 9) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				phone: "Telefone inválido",
			}));
			isValid = false;
		}

		if (!values.password || values.password.length < 6) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				password: "Password deve ter pelo menos 6 caracteres",
			}));
			isValid = false;
		}

		if (!values.confirmPassword || values.confirmPassword.length < 6) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				confirmPassword: "Password deve ter pelo menos 6 caracteres",
			}));
			isValid = false;
		}

		if (values.password !== values.confirmPassword) {
			setValuesError((prevErrors) => ({
				...prevErrors,
				confirmPassword: "As passwords não coincidem",
			}));
			isValid = false;
		}

		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsSubmitting(true);
		if (!inputsValidation()) {
			setIsSubmitting(false);
			return;
		}

		doRegister({
			name: values.name,
			phone: values.phone,
			email: values.email,
			password: values.password,
		})
			.then((response) => {
				localStorage.setItem(
					SESSION_TOKEN,
					response.data.authorization.token
				);
				dispatch(
					login(
						response.data.authorization.token,
						response.data.user.id,
						response.data.user.name,
						response.data.user.role,
						response.data.user.avatar
					)
				);
				navigate("/");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.data.email) {
						setValuesError((prevErrors) => ({
							...prevErrors,
							email: "Já existe uma conta com este email",
						}));
					}
				} else if (error.request)
					console.log(
						"Error: Sem resposta do servidor",
						error.request
					);
				else console.log("Error", error.message);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<>
			<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
				<div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
					<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
						<Link
							to="/"
							className="text-center flex flex-col justify-center items-center gap-4"
						>
							<img
								src="../../../logo.png"
								alt="nomoresselfie logo"
								className="h-20"
							/>
							<h1 className="text-center text-3xl xl:text-4xl font-light">
								NoMoreSelfie
							</h1>
						</Link>
						<div className="mt-8 flex flex-col items-center">
							<h1 className="text-xl xl:text-2xl font-bold">
								Registe a sua conta
							</h1>
							<div className="w-full flex-1 mt-8">
								<div className="mx-auto max-w-sm">
									<form
										action="#"
										autoComplete="off"
										onSubmit={handleSubmit}
									>
										<input
											className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
												valuesError.name
													? "border-red-500"
													: "border-gray-200"
											} placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
											type="text"
											id="name"
											name="name"
											placeholder="Nome e apelido"
											onChange={handleChange("name")}
										/>
										{valuesError.name && (
											<p className="text-red-500 text-xs mt-1">
												{valuesError.name}
											</p>
										)}

										<input
											className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
												valuesError.phone
													? "border-red-500"
													: "border-gray-200"
											} placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
											type="tel"
											id="phone"
											name="phone"
											placeholder="Telefone"
											onChange={handleChangePhone()}
										/>
										{valuesError.phone && (
											<p className="text-red-500 text-xs mt-1">
												{valuesError.phone}
											</p>
										)}

										<input
											className={`w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
												valuesError.email
													? "border-red-500"
													: "border-gray-200"
											} placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50`}
											type="email"
											id="email"
											name="email"
											placeholder="Email"
											onChange={handleChange("email")}
										/>
										{valuesError.email && (
											<p className="text-red-500 text-xs mt-1">
												{valuesError.email}
											</p>
										)}

										<div className="relative">
											{values.password && (
												<button
													type="button"
													className="absolute transform top-1/2 right-4"
													onClick={handleClickShowPassword(
														"showPassword"
													)}
												>
													{values.showPassword ? (
														<AiFillEyeInvisible className="text-xl text-gray-400" />
													) : (
														<AiFillEye className="text-xl text-gray-400" />
													)}
												</button>
											)}
											<input
												className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
													valuesError.password
														? "border-red-500"
														: "border-gray-200"
												} placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50 mt-5`}
												type={
													values.showPassword
														? "text"
														: "password"
												}
												id="password"
												name="password"
												placeholder="Password"
												onChange={handleChange(
													"password"
												)}
											/>
										</div>
										{valuesError.password && (
											<p className="text-red-500 text-xs mt-1">
												{valuesError.password}
											</p>
										)}
										<div className="relative">
											{values.confirmPassword && (
												<button
													type="button"
													className="absolute transform top-1/2 right-4"
													onClick={handleClickShowPassword(
														"showConfirmPassword"
													)}
												>
													{values.showConfirmPassword ? (
														<AiFillEyeInvisible className="text-xl text-gray-400" />
													) : (
														<AiFillEye className="text-xl text-gray-400" />
													)}
												</button>
											)}
											<input
												className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
													valuesError.confirmPassword
														? "border-red-500"
														: "border-gray-200"
												} placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 focus:bg-gray-50 mt-5`}
												type={
													values.showConfirmPassword
														? "text"
														: "password"
												}
												id="confirm_password"
												name="confirm_password"
												placeholder="Confirmar Password"
												onChange={handleChange(
													"confirmPassword"
												)}
											/>
										</div>
										{valuesError.confirmPassword && (
											<p className="text-red-500 text-xs mt-1">
												{valuesError.confirmPassword}
											</p>
										)}

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
										<div className="mb-2">
											Já tem uma conta?
											<Link
												to="/login"
												className="text-orange-400 hover:text-orange-600 ml-1"
											>
												Iniciar sessão
											</Link>
										</div>

										<Link
											to="/signin/supplier"
											className="text-gray-600 hover:text-gray-800 ml-1mt-2 text-sm m-auto text-center font-bold"
										>
											Criar conta fornecedor
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex-1 bg-black text-center hidden lg:flex">
						<img
							src="../../../images/wallpaperlogin.jpg"
							className="absolute object-cover w-full h-full"
						/>
						<div className="absolute inset-0 bg-black opacity-25" />
					</div>
				</div>
			</div>
		</>
	);
}
