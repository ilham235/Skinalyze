import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-container">
      {/* Background bubble */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>

      {/* Header */}
      <header className="signup-header">
        <h1 className="app-title">Skinalyze</h1>
        <p className="app-subtitle">Analyze Your Skin</p>
      </header>

      {/* Main form */}
      <div className="signup-card">
        <div className="logo-circle">
          <img src="logo-skinalyze.png" alt="logo" />
        </div>

        <h2 className="signup-text">Sign Up</h2>

        <form className="signup-form">
          <input type="text" placeholder="Enter your full name" required />
          <input type="email" placeholder="Enter your email" required />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <img
              src="eye.png"
              alt="show"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              required
            />
            <img
              src="eye.png"
              alt="show"
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <button className="btn-continue">Continue</button>

          <div className="google-btn">
            <img src="google.png" alt="google" />
            <span>Continue with Google</span>
          </div>

        </form>
      </div>

      {/* Character illustration */}
      <div className="character">
        <img src="Orang1.png" alt="character" />
      </div>

      {/* Skincare icons */}
      <img src="Skincare.png" alt="SPF" className="skincare spf" />
      <img src="Skincare2.png" alt="Toner" className="skincare toner" />
      <img src="Skincare3.png" alt="Moisturizer" className="skincare moisturizer" />

      {/* Footer */}
      <footer className="signup-footer">
  <div className="footer-line"></div>
  <div className="footer-icons">
    <img src="Instagram.png" alt="Instagram" />
    <img src="tiktok.png" alt="TikTok" />
    <img src="email.png" alt="Email" />
  </div>
</footer>

    </div>
  );
};

export default SignUp;
