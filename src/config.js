// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZ20ixxcQoKG_ciAxddM0qkEyxpZbXCpE",
  authDomain: "travel-app-29b3c.firebaseapp.com",
  projectId: "travel-app-29b3c",
  storageBucket: "travel-app-29b3c.appspot.com",
  messagingSenderId: "950386792612",
  appId: "1:950386792612:web:96a5323b9876f927c36e31"
};

const app = initializeApp(firebaseConfig);
export const imgStorage = getStorage(app);