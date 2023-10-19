import * as React from "react";
import {
  useLocation,
  Outlet,
} from "react-router-dom";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";

import "./App.css";
import SupplierPanel from "./Pages/Supplier/SupplierPanel";

export default function App() {
  const location = useLocation();
  const layoutRender = !['/login', '/signin', '/signin/supplier'].includes(location.pathname);
  const supplierTab = ['supplier'].includes(location.pathname.split('/')[1]);

  return (
    <>
      {layoutRender && <Header />}
        {supplierTab && <SupplierPanel  />}
        <Outlet />
      {layoutRender && <Footer />}
    </>
  );
}
