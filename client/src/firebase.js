/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2be51.firebaseapp.com",
  projectId: "mern-blog-2be51",
  storageBucket: "mern-blog-2be51.appspot.com",
  messagingSenderId: "817069983362",
  appId: "1:817069983362:web:e455ce3aad006dd096569b"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export default app