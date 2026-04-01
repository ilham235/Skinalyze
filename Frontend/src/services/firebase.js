// src/services/firebase.js
// PENTING: Tambahkan 'getApps' dan 'getApp' di import
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // TAMBAHAN BARU
 
const firebaseConfig = {
  apiKey: "AIzaSyCvxXEsMHNaCgpH-oEfK3bYzwc9Q01jONo", // Masukkan API Key aslimu di sini
  authDomain: "skinalyze-ddc41.firebaseapp.com",
  projectId: "skinalyze-ddc41",
  storageBucket: "skinalyze-ddc41.firebasestorage.app",
  messagingSenderId: "574934149757",
  appId: "1:574934149757:web:a90d9f22aa61d07f299f14",
  measurementId: "G-8B39F02466"
};

// --- BAGIAN INI YANG DIPERBAIKI ---
// Logika: Cek apakah array apps kosong? 
// Jika kosong (!getApps().length), buat app baru.
// Jika tidak kosong, gunakan app yang sudah ada (getApp()).
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // EXPORT DATABASE