// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// USE DOTENV FILE FOR SENSITIVE DATA
const firebaseConfig = {
  apiKey: "AIzaSyCTZhs6yzNc_fPofBA8CRBozrGjyYs2F80",
  authDomain: "shopco-4e99d.firebaseapp.com",
  projectId: "shopco-4e99d",
  storageBucket: "shopco-4e99d.firebasestorage.app",
  messagingSenderId: "370626007565",
  appId: "1:370626007565:web:8f731448da7917cfefbb44",
  measurementId: "G-MSK6Q0PNSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export  { app,  db };