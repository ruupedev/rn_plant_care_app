import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "process.env.EXPO_PUBLIC_FIREBASE_API_KEY",
  authDomain: "rn-plant-app-ba9c9.firebaseapp.com",
  projectId: "rn-plant-app-ba9c9",
  storageBucket: "rn-plant-app-ba9c9.firebasestorage.app",
  messagingSenderId: "848548592007",
  appId: "1:848548592007:web:3ca35592520b98c4bdbb22",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
