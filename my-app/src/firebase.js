// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWTB7hj5TaMpBUvuRxmBaPax1w-h3g8Zg",
  authDomain: "noteeasy-7db44.firebaseapp.com",
  projectId: "noteeasy-7db44",
  storageBucket: "noteeasy-7db44.appspot.com",
  messagingSenderId: "840556007015",
  appId: "1:840556007015:web:0d0b93817286a314704ec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);