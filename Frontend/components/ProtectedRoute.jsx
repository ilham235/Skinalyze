import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Memantau status login Firebase secara real-time
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Atau ganti dengan Spinner loading kamu
  }

  // Jika user ada, izinkan masuk (Outlet). Jika tidak, lempar ke login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;