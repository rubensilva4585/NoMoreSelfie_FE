import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import App from "./App";
import PageHome from './Pages/Home/PageHome';
import PageUserSettings from './Pages/UserSettings/PageUserSettings';
import SupplierPanel from './Pages/Supplier/Settings/SupplierPanel';
import PageSearch from './Pages/Search/PageSearch';
import Register from './Pages/Register/Register';
import { RegisterSupplier } from './Pages/Register/RegisterSupplier';
import Login from './Pages/Login/Login';
import SupplierPorfolio from './Pages/Supplier/Settings/SupplierPorfolio';
import SupplierServices from './Pages/Supplier/Settings/SupplierServices';
import SupplierPage from './Pages/Supplier/SupplierPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: "/settings",
        element: <PageUserSettings />,
      },
      {
        path: "/supplier",
        element: <SupplierPage  />,
      },
      {
        path: "/supplier/dashboard",
        element: <PageSearch  />,
      },
      {
        path: "/supplier/services",
        element: <SupplierServices  />,
      },
      {
        path: "/supplier/portfolio",
        element: <SupplierPorfolio  />,
      },
      {
        path: "/supplier/contacts",
        element: <SupplierPanel  />,
      },
      {
        path: "/search",
        element: <PageSearch />,
      },
      {
        path: "/signin",
        element: <Register />,
      },
      {
        path: "/signin/supplier",
        element: <RegisterSupplier />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "*",
      //   element: <Navigate to="/" replace />,
      // },
    ]
  },
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
