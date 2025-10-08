// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQuumEmoSTkInoGEHumQ26mIZJrtKl630",
  authDomain: "shopez-b7663.firebaseapp.com",
  projectId: "shopez-b7663",
  storageBucket: "shopez-b7663.firebasestorage.app",
  messagingSenderId: "254188690499",
  appId: "1:254188690499:web:3fbcdd7f960a9aab7888f6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
