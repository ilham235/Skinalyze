import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* USER */
import HalamanLogin from "./Pages/HalamanLogin";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Riwayat from "./Pages/Riwayat";
import Analisis from "./Pages/Analisis";
import HasilAnalisis from "./Pages/HasilAnalisis";
import Edukasi from "./Pages/Edukasi";
import Rekomendasi from "./Pages/Rekomendasi";
import DetailProduk from "./Pages/DetailProduk";

/* ADMIN */
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminProducts from "./Pages/admin/AdminProducts";
import AdminStats from "./Pages/admin/AdminStats";

function App() {
  return (
    <Router>
      <Routes>

        {/* USER */}
        <Route path="/" element={<HalamanLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/hasilanalisis" element={<HasilAnalisis />} />
        <Route path="/edukasi" element={<Edukasi />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/detailproduk" element={<DetailProduk />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* default redirect */}
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produk" element={<AdminProducts />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
