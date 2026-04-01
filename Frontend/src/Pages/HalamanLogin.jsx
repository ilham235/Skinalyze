import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HalamanLogin.css';

const HalamanLogin = () => {
    const navigate = useNavigate();

    return (
        <div className="skinanalyze-container">
            {/* Lingkaran background */}
            <div className="background-circle-top-left"></div>

            {/* Header */}
            <header className="skinanalyze-header">
                <h1 className="skinanalyze-logo">Skinalyze</h1>
                <p className="skinanalyze-tagline">Analyze Your Skin</p>
            </header>

            {/* Main content */}
            <main className="skinanalyze-main-content">
                
                {/* Section kiri */}
                <section className="left-section">
                    <div className="profile-circle">
                        <img 
                            src="/logo-skinalyze.png" 
                            alt="Skin Profile Icon" 
                            className="profile-icon"
                        />
                    </div>
                    
                    <div className="text-block">
                        Uncover your unique skin profile and <br/>
                        understand your skin's needs.<br/>
                        <span className="scan-shelf-text">Scan Your Self!</span>
                    </div>
                </section>
                
                {/* Section kanan - ilustrasi + tombol */}
                <section className="right-section-illustration">
                    <img 
                        src="/Orang1.png" 
                        alt="Woman applying skincare" 
                        className="skincare-illustration-woman"
                    />

                    <img src="/Skincare.png" alt="SPF 60" className="product-icon spf60" />
                    <img src="/Skincare2.png" alt="Toner" className="product-icon toner" />
                    <img src="/Skincare3.png" alt="Moisturizer" className="product-icon moisturizer" />

                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                    <div className="bubble bubble-5"></div>
                    <div className="bubble bubble-6"></div> 
                    <div className="bubble bubble-7"></div>

                    {/* Tombol Login & Register */}
                    <div className="button-container">
                        <button 
                            className="main-button login-button"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>

                        <button 
                            className="main-button register-button"
                            onClick={() => navigate('/signup')}
                        >
                            Register
                        </button>
                    </div>
                </section>
            </main>

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

export default HalamanLogin;
