// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE, 
  authDomain: "wesamyet-25885.firebaseapp.com",
  projectId: "wesamyet-25885",
  storageBucket: "wesamyet-25885.appspot.com",
  messagingSenderId: "31778036990",
  appId: "1:31778036990:web:bff86911f41485c8c8d9af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
