import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' //Giriş için
import {getFirestore} from 'firebase/firestore' //veritabanı işlemleri için
import {getStorage} from 'firebase/storage' //dosya yükleme için



const firebaseConfig = {
    apiKey: "AIzaSyCzy9wygHqRSppjhisrQ0aJgMILJDc8Qog",
    authDomain: "blogapp-d0eb4.firebaseapp.com",
    projectId: "blogapp-d0eb4",
    storageBucket: "blogapp-d0eb4.appspot.com",
    messagingSenderId: "892291201091",
    appId: "1:892291201091:web:6847f8cd94dee2a4d1fcf6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)