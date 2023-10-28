import {
	FaFacebookF,
	FaInstagram,
	FaPinterest,
	FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-black lg:grid lg:grid-cols-5">
			<div className="relative block h-32 lg:col-span-2 lg:h-full">
				<img
					src="https://images.unsplash.com/photo-1642370324100-324b21fab3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					className="filter brightness-50 absolute inset-0 h-full w-full object-cover"
				/>
			</div>

			<div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
					<div>
						<div className="flex sm:items-start sm:flex-col items-center gap-4">
							<img
								src="../../../logo.png"
								alt="nomoresselfie logo"
								className="h-16 "
							/>
							<p>
								<span className="text-xs uppercase tracking-wide text-gray-400">
									Contacte-nos
								</span>

								<a
									href="#"
									className="block text-2xl font-medium hover:opacity-75 sm:text-3xl text-orange-400"
								>
									info@nomoreselfie.pt
								</a>
							</p>
						</div>

						<ul className="mt-8 flex gap-6">
							<li>
								<a
									href="/"
									rel="noreferrer"
									target="_blank"
									className="transition hover:opacity-75 text-gray-200 text-xl"
								>
									<span className="sr-only">Facebook</span>

									<FaFacebookF />
								</a>
							</li>

							<li>
								<a
									href="/"
									rel="noreferrer"
									target="_blank"
									className="transition hover:opacity-75 text-gray-200 text-xl"
								>
									<span className="sr-only">Instagram</span>

									<FaInstagram />
								</a>
							</li>

							<li>
								<a
									href="/"
									rel="noreferrer"
									target="_blank"
									className="transition hover:opacity-75 text-gray-200 text-xl"
								>
									<span className="sr-only">Twitter</span>

									<FaTwitter />
								</a>
							</li>

							<li>
								<a
									href="/"
									rel="noreferrer"
									target="_blank"
									className="transition hover:opacity-75 text-gray-200 text-xl"
								>
									<span className="sr-only">Pinterest</span>

									<FaPinterest />
								</a>
							</li>
						</ul>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<p className="font-medium text-white">Categorias</p>

							<ul className="mt-6 space-y-4 text-sm">
								<li>
									<Link
										to={`/search?category_id=1`}
										className="transition hover:opacity-75 text-gray-200"
									>
										Casamentos
									</Link>
								</li>

								<li>
									<Link
										to={`/search?category_id=2`}
										className="transition hover:opacity-75 text-gray-200"
									>
										Bebés
									</Link>
								</li>

								<li>
									<Link
										to={`/search?category_id=3`}
										className="transition hover:opacity-75 text-gray-200"
									>
										Edição
									</Link>
								</li>

								<li>
									<Link
										to={`/search?category_id=4`}
										className="transition hover:opacity-75 text-gray-200"
									>
										Drone
									</Link>
								</li>

								<li>
									<Link
										to={`/search?category_id=5`}
										className="transition hover:opacity-75 text-gray-200"
									>
										Festas
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<p className="font-medium text-gray-900 dark:text-white">
								Links
							</p>

							<ul className="mt-6 space-y-4 text-sm">
								<li>
									<Link
										to="/"
										className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
									>
										Página Principal
									</Link>
								</li>

								<li>
									<Link
										to="/search"
										className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
									>
										Profissionais
									</Link>
								</li>

								<li>
									<Link
										to="/login"
										className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
									>
										Aceder
									</Link>
								</li>

								<li>
									<Link
										to="/register"
										className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
									>
										Registar
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-100 pt-12 dark:border-gray-800">
					<div className="sm:flex sm:items-center sm:justify-between">
						<ul className="flex flex-wrap gap-4 text-xs">
							<li>
								<a
									href="#"
									className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
								>
									Termos e condições
								</a>
							</li>

							<li>
								<a
									href="#"
									className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
								>
									Políticas de privacidade
								</a>
							</li>
						</ul>

						<p className="mt-8 text-xs text-gray-500 dark:text-gray-400 sm:mt-0">
							&copy; {new Date().getFullYear()} NoMoreSelfie. All
							rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
