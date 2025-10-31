import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* ✅ NAVBAR */}
       
      <nav className="navbar">
        <div className="nav-left">
          <div className="menu-toggle">
            &#9776;
          </div>
          <img src="/orang2.png" className="logo-girl" alt="Girl Logo" />
          <h1 className="brand-name">Skinalyze</h1>
          <span className="brand-tagline">Analyze Your Skin</span>
        </div>  

        <div className="nav-right">
          <div className="nav-icon">
            <img src="/keranjang.png" alt="Cart" />
            <span>Cart</span>
          </div>
          <div className="nav-icon">
            <img src="/tas.png" alt="Shop" />
            <span>Shop</span>
          </div>
        </div>
      </nav>
      {/* ✅ HERO SECTION */}
      <div className="hero-box">
        <p className="hero-text">
          Skinalyze adalah aplikasi berbasis AI yang membantu kamu memahami kondisi kulit wajah
          dan menemukan produk skincare yang paling cocok. <br /><br />
          Cukup unggah foto wajahmu, biarkan AI menganalisis, dan temukan rekomendasi produk terbaik
          yang bisa langsung kamu beli lewat fitur belanja di aplikasi. <br /><br />
          Dengan Skinalyze, perawatan kulit jadi lebih mudah, personal, dan menyenangkan!
        </p>
        

        <button className="analyze-btn">
          Let’s analyze your skin ➜
        </button>
      </div>
     
      <button className="education-btn">
        Education for you 
        </button>
      
        {/* ✅ FOOTER (from HalamanLogin) */}
<footer className="skinanalyze-footer">
  <div className="contact-item">
    <img src="/email.png" alt="Email" className="contact-icon" />
    <span className="contact-link">skinalize@gmail.com</span>
  </div>

  <div className="contact-item">
    <img src="/Instagram.png" alt="Instagram" className="contact-icon" />
    <span>skinalize_official</span>
  </div>

  <div className="contact-item">
    <img src="/tiktok.png" alt="TikTok" className="contact-icon" />
    <span>skinalize_official</span>
  </div>
</footer>

    </div>
  );
}

export default Home;
