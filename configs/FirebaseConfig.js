// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYWUyEAJhMb-8OaO72zgTdWbN5rhh1nzs",
  authDomain: "travel-planner-89979.firebaseapp.com",
  projectId: "travel-planner-89979",
  storageBucket: "travel-planner-89979.appspot.com",
  messagingSenderId: "458478614611",
  appId: "1:458478614611:web:ce9881ec3e89685f3e2ea6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
