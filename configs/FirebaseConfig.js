// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3FIDGMz2GeQu1EQjzi2WX1lcubsyKNeI",
  authDomain: "ai-travel-planner-ddafc.firebaseapp.com",
  projectId: "ai-travel-planner-ddafc",
  storageBucket: "ai-travel-planner-ddafc.appspot.com",
  messagingSenderId: "76320786816",
  appId: "1:76320786816:web:9fb8859ae329f407111965",
  measurementId: "G-62Z0P3DPRR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
