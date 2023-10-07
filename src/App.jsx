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

export default function App() {
  const location = useLocation();
  const layoutRender = !['/login', '/register'].includes(location.pathname);


  return (
    <>
      {layoutRender && <Header />}
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/settings" element={<PageUserSettings />} />
            <Route path="/search" element={<PageSearch />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Other Routes */}
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      {layoutRender && <Footer />}
    </>
  );
}
