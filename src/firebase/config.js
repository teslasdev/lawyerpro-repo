import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
   apiKey: "AIzaSyA0SyADZ5EvwWDXS7EnRphf95BPKg6QDsg",
   authDomain: "lawyerprop.firebaseapp.com",
   projectId: "lawyerprop",
   storageBucket: "lawyerprop.appspot.com",
   messagingSenderId: "117432411000",
   appId: "1:117432411000:web:ae6bc87a330cb2c51d1e8d"
 };

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;