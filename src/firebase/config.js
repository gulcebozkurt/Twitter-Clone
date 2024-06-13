
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAh4hpTm8GgyXI3Zlg9DSsHkvRlKo0IH3I",
    authDomain: "twitter-clone-e0c4e.firebaseapp.com",
    projectId: "twitter-clone-e0c4e",
    storageBucket: "twitter-clone-e0c4e.appspot.com",
    messagingSenderId: "442934481448",
    appId: "1:442934481448:web:f63b816577393af8529b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth hizmetinin referansını alma
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritbanının referansını alma
export const db = getFirestore(app);

// storage referansını alma
export const storage = getStorage(app);