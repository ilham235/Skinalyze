import React, { useState } from 'react';
import './Profil.css';

const Profil = () => {
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [openOrder, setOpenOrder] = useState(true);

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <h2 className="logo">Skinalyze</h2>
        <ul className="menu">
          <li>🏠 Home</li>
          <li>👤 Profil</li>
          <li className="active">📄 Riwayat</li>
        </ul>

        <button className="logout-btn">⏻ Log Out</button>

        <div className="social-footer">
          <span>📩 skinalyze@gmail.com</span>
          <span>📸 skinalyze_official</span>
          <span>🎵 skinalyze_official</span>
        </div>
      </aside>

      <main className="profile-content">
        <div className="profile-header">
          <img src="/avatar.png" alt="avatar" className="avatar" />
          <div>
            <h3>Your Name</h3>
            <p>Skin Type : Combination Skin • Moderate hydration</p>
          </div>
        </div>

        {/* Riwayat Analisis */}
        <div className="card" onClick={() => setOpenAnalysis(!openAnalysis)}>
          <span>Riwayat Analisis</span>
          <span>{openAnalysis ? "⯅" : "⯆"}</span>
        </div>

        {openAnalysis && (
          <div className="analysis-detail">
            <p>- Hasil Analisis 1</p>
            <p>- Hasil Analisis 2</p>
          </div>
        )}

        {/* Riwayat Pesanan */}
        <div className="card" onClick={() => setOpenOrder(!openOrder)}>
          <span>Riwayat Pesanan</span>
          <span>{openOrder ? "⯅" : "⯆"}</span>
        </div>

        {openOrder && (
          <ul className="order-list">
            <li>
              <span>• Sun Screen</span>
              <button className="detail-btn">Detail</button>
            </li>
            <li>
              <span>• Facial Wash</span>
              <button className="detail-btn">Detail</button>
            </li>
            <li>
              <span>• Serum</span>
              <button className="detail-btn">Detail</button>
            </li>
          </ul>
        )}
      </main>
    </div>
  );
};

export default Profil;
