import * as React from "react";
import { useLocation, Outlet } from "react-router-dom";
import store from "./redux/store";
import { login } from "./redux/actions";
import axios from "axios";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";
import SupplierPanel from "./Pages/Supplier/Settings/SupplierPanel";
import ErrorUnauthorized from "./Pages/Error/ErrorUnauthorized";
import { ROLE_ADMIN, ROLE_SUPPLIER, SESSION_TOKEN } from "./constants/General";
import { getUserRole } from "./redux/selectors";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import ScrollToTop from "./ScrollToTop";

export default function App() {
	// States
	const [isLoading, setIsLoading] = React.useState(true);
	const userRole = useSelector(getUserRole);
	const location = useLocation();

	// consts
	const token = localStorage.getItem(SESSION_TOKEN);
	const isSupplierRoute = [
		"/supplier/dashboard",
		"/supplier/services",
		"/supplier/portfolio",
		"/supplier/contacts",
	].includes(location.pathname);
	const isAdminRoute = ["/admin"].includes(location.pathname);
	const isLoginRoute = ["/settings"].includes(location.pathname);

	// Layout (Header + Footer) routes
	const layoutRender = !["/login", "/signin", "/signin/supplier"].includes(
		location.pathname
	);

	// functions
	// Verify if user is authorized to access the route
	const isAuthorized = (allowedRoles) => {
		return userRole ? allowedRoles.includes(userRole) : false;
	};

	// Effects
	React.useEffect(() => {
		const abortController = new AbortController();

		if (token) {
			axios
				.get("http://localhost:8000/api/user/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					const { id, name, role, avatar } = response.data;
					store.dispatch(login(token, id, name, role, avatar));
				})
				.catch((error) => {
					toast.error("Ocorreu um problema.");
					localStorage.removeItem(SESSION_TOKEN);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else setIsLoading(false);

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="h-screen flex flex-col items-center justify-center gap-6">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400" />
					<div className="text-center text-3xl xl:text-4xl text-orange-400">
						NoMoreSelfie
					</div>
				</div>
			) : (
				<>
					{(isSupplierRoute && !isAuthorized([ROLE_SUPPLIER])) ||
					(isAdminRoute && !isAuthorized([ROLE_ADMIN])) ||
					(!token && isLoginRoute) ? (
						<ErrorUnauthorized />
					) : (
						<>
							{layoutRender && <Header />}
							{isSupplierRoute && <SupplierPanel />}
							<Outlet />
							{layoutRender && <Footer />}
						</>
					)}
				</>
			)}
			<Toaster />
			<ScrollToTop />
		</>
	);
}
