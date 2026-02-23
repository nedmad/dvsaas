// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfb3oe_8PlZ6uFwr80CF9iWQ4zAbK5Dp4",
  authDomain: "devsass.firebaseapp.com",
  projectId: "devsass",
  storageBucket: "devsass.firebasestorage.app",
  messagingSenderId: "829738516227",
  appId: "1:829738516227:web:bd5663aa76d9d268593336"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}