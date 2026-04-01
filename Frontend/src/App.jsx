import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

/* USER - Lazy loaded */
const Analisis = lazy(() => import("./Pages/Analisis"));
const DetailProduk = lazy(() => import("./Pages/DetailProduk"));
const Edukasi = lazy(() => import("./Pages/Edukasi"));
const HalamanLogin = lazy(() => import("./Pages/HalamanLogin"));
const HasilAnalisis = lazy(() => import("./Pages/HasilAnalisis"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/login"));
const Profil = lazy(() => import("./Pages/Profil"));
const Rekomendasi = lazy(() => import("./Pages/Rekomendasi"));
const Riwayat = lazy(() => import("./Pages/Riwayat"));
const SignUp = lazy(() => import("./Pages/SignUp"));

/* ADMIN - Lazy loaded */
const AdminDashboard = lazy(() => import("./Pages/admin/AdminDashboard"));
const AdminLayout = lazy(() => import("./Pages/admin/AdminLayout"));
const AdminProducts = lazy(() => import("./Pages/admin/AdminProducts"));
const AdminStats = lazy(() => import("./Pages/admin/AdminStats"));

// Loading component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
