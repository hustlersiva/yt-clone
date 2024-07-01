// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmQnEbJ4ZDfrZ5Qh_os2mB3qShNYeMawo",
  authDomain: "ytclone-2024.firebaseapp.com",
  projectId: "ytclone-2024",
  storageBucket: "ytclone-2024.appspot.com",
  messagingSenderId: "116362752779",
  appId: "1:116362752779:web:ad24b8a855108b566c680e",
  measurementId: "G-MDLVXB1GNY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();
export { app, db, auth, provider, timestamp };
