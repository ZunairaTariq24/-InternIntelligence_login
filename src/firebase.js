// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRwYd4vJqvdEjg4iqac0K40DvPeabO4mE",
  authDomain: "login-page-36ad4.firebaseapp.com",
  projectId: "login-page-36ad4",
  storageBucket: "login-page-36ad4.firebasestorage.app",
  messagingSenderId: "967643929329",
  appId: "1:967643929329:web:d375517d3c34911c48e750",
  measurementId: "G-MDQ9LSLKCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
