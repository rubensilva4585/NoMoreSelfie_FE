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

export default function App() {
  return (
      <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<PageSearch />} />
          <Route path="/register" element={<Register />} />
          
          {/* Other Routes */}
          <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
  );
}
