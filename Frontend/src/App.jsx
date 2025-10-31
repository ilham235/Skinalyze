import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HalamanLogin from "./Pages/HalamanLogin"; // halaman awal
import Login from "./Pages/Login";               // form login
import SignUp from "./Pages/SignUp";             // form signup

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman awal */}
        <Route path="/" element={<HalamanLogin />} />

        {/* Halaman login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman signup */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
