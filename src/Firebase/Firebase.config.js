import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyANz482TNqKgl67-2OoxUKTTAmD74XQN9g",
  authDomain: "class02-65eb9.firebaseapp.com",
  projectId: "class02-65eb9",
  storageBucket: "class02-65eb9.firebasestorage.app",
  messagingSenderId: "197731509035",
  appId: "1:197731509035:web:931fca34de441ef89fdb6e",
  measurementId: "G-0CJ86XFG7B"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const provider = new GoogleAuthProvider(); 

export default app;
