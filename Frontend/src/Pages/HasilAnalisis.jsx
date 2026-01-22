import React, { useState, useEffect, useRef } from "react";
import "./HasilAnalisis.css";
import { useNavigate, useLocation } from "react-router-dom";
import Markdown from "react-markdown"; // <--- IMPORT LIBRARY INI

function HasilAnalisis() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Ambil Data Hasil AI
  const { image, jenisKulit, masalahKulit, aiResult } = location.state || {};

  // --- STYLE UTAMA ---
  const autoHeightBoxStyle = {
    backgroundColor: '#fff',  
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #e0e0e0',
    textAlign: 'left',
    lineHeight: '1.6',        
    // whiteSpace: 'pre-wrap', <--- INI DIHAPUS AGAR MARKDOWN BEKERJA
    fontSize: '15px',
    color: '#333',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
    marginBottom: '20px'      
  };

  useEffect(() => {
    if (!image || !aiResult) {
      alert("Data analisis tidak ditemukan. Silakan ulangi.");
      navigate("/analisis");
    }
  }, [image, aiResult, navigate]);

  // Handle Sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.classList.contains("hasil-menu-toggle")) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!aiResult) return null;

  return (
    <div className="hasil-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      {/* SIDEBAR */}
      <div ref={sidebarRef} className={`hasil-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="hasil-sidebar-logo">Skinalyze</h2> <hr className="hasil-sidebar-line" />
        <ul className="hasil-sidebar-menu">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/profil")}>Profil</li>
          <li onClick={() => navigate("/riwayat")}>Riwayat</li>
        </ul>
        <button className="hasil-logout-btn" onClick={() => navigate("/")}>Log Out</button>
      </div>

      {/* NAVBAR */}
      <nav className="hasil-navbar" style={{flexShrink: 0}}> 
        <div className="hasil-nav-left">
          {!isSidebarOpen && <div className="hasil-menu-toggle" onClick={() => setIsSidebarOpen(true)}>&#9776;</div>}
          <img src="/orang2.png" className="hasil-logo-girl" alt="Girl Logo" />
          <h1 className="hasil-brand-name">Skinalyze</h1>
          <span className="hasil-brand-tagline">Analyze Your Skin</span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="hasil-main" style={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          paddingBottom: '200px', 
          paddingTop: '20px'
      }}>
        
        <h2 className="hasil-title">Hasil Analisis AI</h2>

        {/* DATA INPUT USER */}
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
            {image && (
                <img src={image} alt="Wajah User" style={{width: '140px', height: '140px', objectFit: 'cover', borderRadius: '50%', border: '4px solid #ff9a9e', boxShadow: '0 5px 15px rgba(0,0,0,0.15)'}} />
            )}
            <div style={{marginTop: '15px'}}>
               <span style={{background: 'white', padding: '8px 20px', borderRadius: '25px', fontSize: '14px', fontWeight: 'bold', color: '#555', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                 {jenisKulit} &bull; {masalahKulit}
               </span>
            </div>
        </div>

        {/* 1. HASIL ANALISIS VISUAL */}
        <div className="hasil-section">
            <h3 style={{color:'#ff6b81', marginBottom:'15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px'}}>
               🔍 <span>Analisis Visual</span>
            </h3>
            <div style={autoHeightBoxStyle}>
                {/* MENGGUNAKAN KOMPONEN MARKDOWN */}
                <Markdown>{aiResult.analisis_visual}</Markdown>
            </div>
        </div>

        {/* 2. SARAN PERAWATAN */}
        <div className="hasil-section" style={{marginTop: '30px'}}>
            <h3 style={{color:'#ff6b81', marginBottom:'15px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px'}}>
               ✨ <span>Saran Perawatan</span>
            </h3>
            <div style={autoHeightBoxStyle}>
                {/* MENGGUNAKAN KOMPONEN MARKDOWN */}
                <Markdown>{aiResult.saran_perawatan}</Markdown>
            </div>
        </div>

        {/* 3. REKOMENDASI PRODUK */}
        <h3 className="hasil-subtitle" style={{marginTop: '40px', fontSize: '20px'}}>Rekomendasi Produk</h3>
        <div className="hasil-produk-list">
          {aiResult.rekomendasi_produk?.map((p, i) => (
            <div key={i} className="hasil-produk-card">
              <h4 style={{fontSize: '16px', marginBottom: '8px'}}>{p.nama}</h4>
              <p style={{fontSize: '13px', color: '#666', marginBottom: '8px'}}>{p.kategori}</p>
              <p style={{fontWeight: 'bold', color: '#ff6b81', fontSize: '15px'}}>Rp {p.harga ? p.harga.toLocaleString() : '0'}</p>
            </div>
          ))}
        </div>

        <div className="hasil-checkout-container" style={{marginTop: '40px', marginBottom: '50px'}}>
          <button className="hasil-checkout-button" onClick={() => navigate("/rekomendasi")}>
            Checkout Now <span className="hasil-arrow-icon-circle">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default HasilAnalisis;