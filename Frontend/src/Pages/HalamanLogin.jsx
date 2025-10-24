import React from 'react';
import './HalamanLogin.css'; // Import file CSS

const HalamanLogin = () => {
    return (
        <div className="skinanalyze-container">
            {/* Latar Belakang Lingkaran Pink Sudut Kiri Atas */}
            <div className="background-circle-top-left"></div>

            <header className="skinanalyze-header">
                <h1 className="skinanalyze-logo">Skinalyze</h1>
                <p className="skinanalyze-tagline">Analyze Your Skin</p>
            </header>

            <main className="skinanalyze-main-content">
                <section className="left-section">
                    <div className="profile-circle">
                        {/* Ganti src dengan path ikon profil wajah dan bintang yang kamu miliki */}
                        <img 
                            src="logo-skinalyze.png" // Contoh path
                            alt="Skin Profile Icon" 
                            className="profile-icon"
                        />
                    </div>
                    
                    <div className="text-block">
                        Uncover your unique skin profile and 
                        <br/>
                        understand your skin's needs. 
                        <br/>
                        <span className="scan-shelf-text">Scan Your Shelf!</span>
                    </div>
                    
                    {/* Tombol Login dan Register dipindahkan ke section ilustrasi agar sejajar */}
                    {/* sesuai desain awal */}
                </section>
                
                <section className="right-section-illustration">
                    {/* Ilustrasi utama wanita yang menerapkan skincare */}
                    {/* Ini idealnya adalah satu gambar PNG transparan */}
                    <img 
                        src="Orang1.png" // Contoh path
                        alt="Woman applying skincare" 
                        className="skincare-illustration-woman"
                    />

                    {/* Ikon produk yang diposisikan secara absolut */}
                    <img src="Skincare.png" alt="SPF 60" className="product-icon spf60" />
                    <img src="Skincare2.png" alt="Toner" className="product-icon toner" />
                    <img src="Skincare3.png" alt="Moisturizer" className="product-icon moisturizer" />

                    {/* Elemen Gelembung - Perlu penempatan CSS yang hati-hati */}
                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                    <div className="bubble bubble-5"></div>
                    <div className="bubble bubble-6"></div> {/* Menambah lebih banyak gelembung */}
                    <div className="bubble bubble-7"></div>

                    {/* Tombol Login dan Register */}
                    <div className="button-container">
                        <button className="main-button login-button">Login</button>
                        <button className="main-button register-button">Register</button>
                    </div>
                </section>
            </main>

            <footer className="skinanalyze-footer">
                <div className="contact-item">
                    {/* Ikon Email - gunakan ikon font atau gambar SVG jika ada */}
                    <img src="email.png" alt="Email" className="contact-icon" />
                    <span className="contact-link">skinalize@gmail.com</span>
                </div>
                <div className="contact-item">
                    {/* Ikon Instagram */}
                    <img src="Instagram.png" alt="Instagram" className="contact-icon" />
                    <span>skinalize_official</span>
                </div>
                <div className="contact-item">
                    {/* Ikon TikTok */}
                    <img src="tiktok.png" alt="TikTok" className="contact-icon" />
                    <span>skinalize_official</span>
                </div>
            </footer>
        </div>
    );
};

export default HalamanLogin;