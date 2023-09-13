import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
   apiKey: "AIzaSyDyu2j00-CxHG-_ulVftLskmhIJY52K0HU",
   authDomain: "lawyer-pro-ai.firebaseapp.com",
   projectId: "lawyer-pro-ai",
   storageBucket: "lawyer-pro-ai.appspot.com",
   messagingSenderId: "197547991679",
   appId: "1:197547991679:web:5c8f3c7dcea0f64a48d54a",
   measurementId: "G-TRC51RDMX5"
 };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)
export const dbUsers = collection(db, "users");
export const auth = getAuth(firebaseApp);
export default firebaseApp;
