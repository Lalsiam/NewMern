// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASxHRb7Gcbm9gdijrAYqGM_8H6CFsIOwI",
  authDomain: "merg-98dec.firebaseapp.com",
  projectId: "merg-98dec",
  storageBucket: "merg-98dec.appspot.com",
  messagingSenderId: "237939168365",
  appId: "1:237939168365:web:1ff4faf197377c392f1b64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
