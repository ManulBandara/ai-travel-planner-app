// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3FIDGMz2GeQu1EQjzi2WX1lcubsyKNeI",
  authDomain: "ai-travel-planner-ddafc.firebaseapp.com",
  projectId: "ai-travel-planner-ddafc",
  storageBucket: "ai-travel-planner-ddafc.firebasestorage.app",
  messagingSenderId: "76320786816",
  appId: "1:76320786816:web:2de9039013de64b8111965",
  measurementId: "G-S1WW2TS9T2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
