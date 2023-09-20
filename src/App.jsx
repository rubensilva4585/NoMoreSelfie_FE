import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PageHome from "./Pages/Home/PageHome";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
