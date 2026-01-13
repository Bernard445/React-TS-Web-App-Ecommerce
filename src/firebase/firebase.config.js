import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL6bhMan94jzTKitsk22ZR3NSKzNpdsLA",
    authDomain: "my-ecommerce-app-c8410.firebaseapp.com",
    projectId: "my-ecommerce-app-c8410",
    storageBucket: "my-ecommerce-app-c8410.firebasestorage.app",
    messagingSenderId: "363295543706",
    appId: "1:363295543706:web:b6ee1b72e385462f36aa23"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
