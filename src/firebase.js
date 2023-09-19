import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //Giriş için
import { getFirestore } from "firebase/firestore"; //veritabanı işlemleri için

const firebaseConfig = {
  apiKey: "AIzaSyBpdKVIiy7fDEE9_L5wXRnyTKTMcVCIq50",
  authDomain: "noteapp-2789d.firebaseapp.com",
  projectId: "noteapp-2789d",
  storageBucket: "noteapp-2789d.appspot.com",
  messagingSenderId: "598436670269",
  appId: "1:598436670269:web:5cf40680f427d446daf354",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
