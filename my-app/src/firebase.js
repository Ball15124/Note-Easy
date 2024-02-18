// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH2e3bcLT4D2dNWeAT5wxnsgAvKhvHDxs",
  authDomain: "noteeasyhost.firebaseapp.com",
  projectId: "noteeasyhost",
  storageBucket: "noteeasyhost.appspot.com",
  messagingSenderId: "523914059454",
  appId: "1:523914059454:web:e682df76f44b4cd1ae88ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);