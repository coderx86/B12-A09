// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD1dgs8-RCD7zaxtJW8qRC5jxZon6-0fM",
    authDomain: "greennest-43c81.firebaseapp.com",
    projectId: "greennest-43c81",
    storageBucket: "greennest-43c81.firebasestorage.app",
    messagingSenderId: "359931664017",
    appId: "1:359931664017:web:68cc93ffb14aaf19e41130",
    measurementId: "G-KDX4M20VNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
