import * as React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PageHome from "./Pages/Home/PageHome";
import PageSearch from "./Pages/Search/PageSearch";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";
import PageUserSettings from "./Pages/UserSettings/PageUserSettings";
import { RegisterSupplier } from "./Pages/Register/RegisterSupplier";
import SupplierServices from "./Pages/Supplier/SupplierServices";
import SupplierServicesForm from "./Pages/Supplier/SupplierServicesForm";
import SupplierPage from "./Pages/Search/SupplierPage";
import "./App.css";

export default function App() {
  const location = useLocation();
  const layoutRender = !['/login', '/signin', '/signin/supplier'].includes(location.pathname);

  return (
    <>
      {layoutRender && <Header />}
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/settings" element={<PageUserSettings />} />
        <Route path="/supplier/services" element={<SupplierServices />} />
        <Route path="/supplier/services/edit/:id" element={<SupplierServicesForm />} />
        <Route path="/supplier/services/new" element={<SupplierServicesForm />} />
        <Route path="/search" element={<PageSearch />} />
        <Route path="supplier" element={<SupplierPage />} />

        <Route path="/signin" element={<Register />} />
        <Route path="/signin/supplier" element={<RegisterSupplier />} />
        <Route path="/login" element={<Login />} />

        {/* Other Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {layoutRender && <Footer />}
    </>
  );
}
