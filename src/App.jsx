import * as React from "react";
import {
  useLocation,
  Outlet,
} from "react-router-dom";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";

import "./App.css";
import SupplierPanel from "./Pages/Supplier/Settings/SupplierPanel";

export default function App() {
  const location = useLocation();
  const layoutRender = !['/login', '/signin', '/signin/supplier'].includes(location.pathname);
  const supplierTab = ['/supplier/dashboard', '/supplier/services', '/supplier/portfolio', '/supplier/contacts'].includes(location.pathname);

  return (
    <>
      {layoutRender && <Header />}
        {supplierTab && <SupplierPanel  />}
        <Outlet />
      {layoutRender && <Footer />}
    </>
  );
}
