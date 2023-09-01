// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getStorage, ref } from "firebase/storage";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtiDD-0tspNaBo9Kw8_6iKWmsVYDNIjNQ",
    authDomain: "bmi-web-9aa44.firebaseapp.com",
    projectId: "bmi-web-9aa44",
    storageBucket: "bmi-web-9aa44.appspot.com",
    messagingSenderId: "94706146170",
    appId: "1:94706146170:web:90dd099b940066b7e9d4c3",
    measurementId: "G-32M51QS6G1"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()