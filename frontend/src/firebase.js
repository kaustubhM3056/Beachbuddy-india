// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the services we will use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// We are skipping Storage for now because of the billing bug
// import { getStorage } from "firebase/storage";

// Your NEW web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDEGo0eAW6fMHxQuAyxUZk5qA8T50PuVY",
  authDomain: "beachbuddy-india-63acd.firebaseapp.com",
  projectId: "beachbuddy-india-63acd",
  storageBucket: "beachbuddy-india-63acd.firebasestorage.app",
  messagingSenderId: "989259525443",
  appId: "1:989259525443:web:0eba002a783f2f757b93f6",
  measurementId: "G-G9XNGGN6JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app); // This is for user login
export const db = getFirestore(app); // This is for your database
// export const storage = getStorage(app); // We will add this later

export default app; 