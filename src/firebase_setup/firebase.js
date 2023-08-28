// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3DAh8UezahZmwKsaiTIFX_DwOFywvfgw",
    authDomain: "blogapp-ef75c.firebaseapp.com",
    projectId: "blogapp-ef75c",
    storageBucket: "blogapp-ef75c.appspot.com",
    messagingSenderId: "1031464045774",
    appId: "1:1031464045774:web:7af304bb6b0d461711d49f",
    measurementId: "G-ST6W3R5784"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);