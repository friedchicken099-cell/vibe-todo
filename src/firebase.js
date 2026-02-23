// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgaF2MkKF4yj2fWLI1JOBFEIk1mWUF8GM",
  authDomain: "vibe-todo-f04e2.firebaseapp.com",
  projectId: "vibe-todo-f04e2",
  storageBucket: "vibe-todo-f04e2.appspot.com",
  messagingSenderId: "953396332854",
  appId: "1:953396332854:web:3870e60a5af029abff0b97"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);