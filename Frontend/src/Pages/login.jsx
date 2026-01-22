import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Tambahkan GoogleAuthProvider dan signInWithPopup
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { auth } from "../services/firebase"; 
import api from "../services/api"; 
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // --- LOGIKA LOGIN EMAIL/PASSWORD (YANG SUDAH ADA) ---
  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      
      console.log("Firebase Login Sukses. UID:", uid);

      // Sinkronisasi dengan Backend MySQL
      const res = await api.post("/auth/login", { 
      uid: uid,
      email: email // <--- TAMBAHAN PENTING INI
});
      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));
      
      // Navigasi
      if (userData.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        alert("Gagal koneksi backend: " + (err.response.data.message || err.message));
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        alert("Email atau password salah.");
      } else {
        alert("Terjadi kesalahan. Pastikan server backend MySQL menyala.");
      }
    }
  };

  // --- LOGIKA BARU: LOGIN DENGAN GOOGLE ---
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      // 1. Munculkan Popup Login Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Data user dari Google
      
      console.log("Google Login Sukses:", user.email);

      // 2. Cek ke Backend MySQL (Sama seperti login biasa)
      // Kita kirim UID dan Email (untuk jaga-jaga kalau user baru)
      const res = await api.post("/auth/login", { 
        uid: user.uid,
        email: user.email 
      });
      
      const userData = res.data;

      // 3. Simpan Session
      localStorage.setItem("user", JSON.stringify(userData));

      // 4. Navigasi
      if (userData.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error("Google Login Error:", err);
      alert("Gagal login dengan Google: " + err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Latar belakang lingkaran pink */}
      <div className="circle-top-left"></div>

      <div className="karakter">
        <img src="/Orang1.png" alt="karakter" />
      </div>

      {/* Header */}
      <header className="login-header">
        <h1 className="app-title">Skinalyze</h1>
        <p className="app-subtitle">Analyze Your Skin</p>
      </header>

      {/* Area logo bulat dan form */}
      <div className="login-content">
        <div className="logo-circle">
          <img src="logo-skinalyze.png" alt="logo" />
        </div>

        <h2 className="login-text">Login</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <img
              src={showPassword ? "/eye.png" : "/eye.png"}
              alt="toggle visibility"
              className="eye-icon"
              onClick={togglePassword}
              style={{cursor: "pointer"}}
            />
          </div>

          <button
            type="submit"
            className="btn-continue"
          >
            Continue
          </button>

          {/* UPDATE DI SINI: Tambahkan onClick dan style cursor */}
          <div 
            className="google-btn" 
            onClick={handleGoogleLogin} 
            style={{cursor: "pointer"}} // Agar terlihat bisa diklik
          >
            <img src="/google.png" alt="Google" />
            <span>Continue with Google</span>
          </div>

          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </form>
      </div>

      {/* Dekorasi Gambar Produk */}
      <img src="Skincare.png" alt="SPF 60" className="product-icon spf60" />
      <img src="Skincare2.png" alt="Toner" className="product-icon toner" />
      <img src="Skincare3.png" alt="Moisturizer" className="product-icon moisturizer" />
      <img src="Skincare.png" alt="SPF 70" className="product-icon spf70" />
      <img src="Skincare2.png" alt="Toner2" className="product-icon toner2" />
      <img src="Skincare3.png" alt="Moisturizer3" className="product-icon moisturizer3" />

      {/* Dekorasi Bubbles */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      <div className="bubble bubble-6"></div>
      <div className="bubble bubble-7"></div>
      <div className="bubble bubble-8"></div>
      <div className="bubble bubble-9"></div>
      <div className="bubble bubble-10"></div>
      <div className="bubble bubble-11"></div>
      <div className="bubble bubble-12"></div>
      <div className="bubble bubble-13"></div>
      <div className="bubble bubble-14"></div>

      {/* Footer */}
      <footer className="skinanalyze-footer">
        <div className="contact-item">
          <img src="/email.png" alt="Email" className="contact-icon" />
          <span className="contact-link">skinalyze@gmail.com</span>
        </div>
        <div className="contact-item">
          <img src="/Instagram.png" alt="Instagram" className="contact-icon" />
          <span>skinalyze_official</span>
        </div>
        <div className="contact-item">
          <img src="/tiktok.png" alt="TikTok" className="contact-icon" />
          <span>skinalyze_official</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;