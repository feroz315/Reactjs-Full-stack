import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrikfCwJfwU5A12vngQ7QFalEDdaJ1zIU",
  authDomain: "web-olx-18c42.firebaseapp.com",
  projectId: "web-olx-18c42",
  storageBucket: "web-olx-18c42.appspot.com",
  messagingSenderId: "1025554584574",
  appId: "1:1025554584574:web:19a245003069edc68326af"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };


