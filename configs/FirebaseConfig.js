// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYWUyEAJhMb-8OaO72zgTdWbN5rhh1nzs",
  authDomain: "travel-planner-89979.firebaseapp.com",
  projectId: "travel-planner-89979",
  storageBucket: "travel-planner-89979.firebasestorage.app",
  messagingSenderId: "458478614611",
  appId: "1:458478614611:web:ce9881ec3e89685f3e2ea6",
  measurementId: "G-D1P6F4TLDS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);