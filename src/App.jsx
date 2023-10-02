import * as React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PageHome from "./Pages/Home/PageHome";
import PageSearch from "./Pages/Search/PageSearch";
import Footer from "./Pages/Components/Footer";
import HeaderNavBar from "./Pages/Components/HeaderNavBar";
import PageUserSettings from "./Pages/UserSettings/PageUserSettings";

export default function App() {
  return (
    <>
      <HeaderNavBar/>
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<PageSearch />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<PageUserSettings />} />

            {/* Other Routes */}
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      {/* <Footer/> */}
    </>
  );
}
