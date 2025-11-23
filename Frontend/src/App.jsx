import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HalamanLogin from "./Pages/HalamanLogin";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Riwayat from "./Pages/Riwayat";
import Analisis from "./Pages/Analisis"
import HasilAnalisis from "./Pages/HasilAnalisis";
import Edukasi from "./Pages/Edukasi";
import Rekomendasi from "./Pages/Rekomendasi";
import DetailProduk from "./Pages/DetailProduk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HalamanLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/hasilanalisis" element={<HasilAnalisis/>} />
        <Route path="/edukasi" element={<Edukasi/>} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/detailproduk" element={<DetailProduk />} />
        
      </Routes>
    </Router>
  );
}

export default App;
