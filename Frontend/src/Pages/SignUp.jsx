import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import api from "../services/api";
import "./SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleContinue = async (e) => {
  e.preventDefault();
  console.log("Klik Register");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Firebase OK");

    const uid = userCredential.user.uid;
    console.log("REGISTER DATA:", {
  uid,
  nama: fullName,
  email,
});

    const res = await api.post("/auth/register", {
      uid,
      nama: fullName,
      email,
    });

    console.log("Backend OK", res.data);

    localStorage.setItem("user", JSON.stringify(res.data));

    console.log("LocalStorage:", localStorage.getItem("user"));

    navigate("/home");
    console.log("Navigate Home");
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    alert(err.message);
  }
};



  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1 className="app-title">Skinalyze</h1>
        <p className="app-subtitle">Analyze Your Skin</p>
      </header>

      <div className="signup-card">
        <h2 className="signup-text">Sign Up</h2>

        <form className="signup-form" onSubmit={handleContinue}>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img src="eye.png" onClick={() => setShowPassword(!showPassword)} />
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img src="eye.png" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          </div>

          <button type="submit" className="btn-continue">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
