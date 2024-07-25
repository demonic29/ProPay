// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ5oEDukc39NHiqSmgvYOJ5h99z88ZxTU",
  authDomain: "propay-c606d.firebaseapp.com",
  projectId: "propay-c606d",
  storageBucket: "propay-c606d.appspot.com",
  messagingSenderId: "299512077927",
  appId: "1:299512077927:web:ad9c4dc663990156623ec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)