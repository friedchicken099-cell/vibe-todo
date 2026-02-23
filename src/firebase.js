// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- add this

const firebaseConfig = {
  apiKey: "AIzaSyCgaF2MkKF4yj2fWLI1JOBFEIk1mWUF8GM",
  authDomain: "vibe-todo-f04e2.firebaseapp.com",
  projectId: "vibe-todo-f04e2",
  storageBucket: "vibe-todo-f04e2.firebasestorage.app",
  messagingSenderId: "953396332854",
  appId: "1:953396332854:web:3870e60a5af029abff0b97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);