import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJgVEEcAzTgRUH2SvTi3u7VtXpYCtoNDQ",
  authDomain: "kelim-f9e46.firebaseapp.com",
  projectId: "kelim-f9e46",
  storageBucket: "kelim-f9e46.appspot.com",
  messagingSenderId: "912757042147",
  appId: "1:912757042147:web:0fd5fd9e3f1952f5720ed6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
