    import React, { useState } from "react";
    import "./Login.css";

    const Login = () => {
    // state buat hide/unhide password
    const [showPassword, setShowPassword] = useState(false);

    // fungsi toggle
    const togglePassword = () => {
        setShowPassword(!showPassword);
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

            <form className="login-form">
            <input type="email" placeholder="Enter your email" required />

            {/* Password input + icon mata */}
            <div className="password-container">
                <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                />
                <img
                src={showPassword ? "/eye.png" : "/eye.png"}
                alt="toggle visibility"
                className="eye-icon"
                onClick={togglePassword}
                />
            </div>

            <button className="btn-continue">Continue</button>

            <div className="google-btn">
                <img src="/google.png" alt="Google" />
                <span>Continue with Google</span>
            </div>

            <a href="#" className="forgot-link">
                Forgot Password?
            </a>
            </form>
        </div>
                    <img src="Skincare.png" alt="SPF 60" className="product-icon spf60" />
                    <img src="Skincare2.png" alt="Toner" className="product-icon toner" />
                    <img src="Skincare3.png" alt="Moisturizer" className="product-icon moisturizer" />
                    <img src="Skincare.png" alt="SPF 70" className="product-icon spf70" />
                    <img src="Skincare2.png" alt="Toner2" className="product-icon toner2" />
                    <img src="Skincare3.png" alt="Moisturizer3" className="product-icon moisturizer3" />

                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                    <div className="bubble bubble-5"></div>
                    <div className="bubble bubble-6"></div> {/* Menambah lebih banyak gelembung */}
                    <div className="bubble bubble-7"></div>
                    <div className="bubble bubble-8"></div>
                    <div className="bubble bubble-9"></div>
                    <div className="bubble bubble-10"></div>
                    <div className="bubble bubble-11"></div>
                    <div className="bubble bubble-12"></div>
                    <div className="bubble bubble-13"></div> {/* Menambah lebih banyak gelembung */}
                    <div className="bubble bubble-14"></div>

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
