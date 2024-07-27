import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx75fXt5iKQ8Ug1uUrHCQ3_Ni1zVqjK70",
    authDomain: "fir-practice-bba02.firebaseapp.com",
    projectId: "fir-practice-bba02",
    storageBucket: "fir-practice-bba02.appspot.com",
    messagingSenderId: "952271345205",
    appId: "1:952271345205:web:1d2471f6d961360fa4c37c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db, collection, addDoc, setDoc, deleteDoc, doc, getDoc, getDocs };