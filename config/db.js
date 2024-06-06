import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfigKey = process.env.FIREBASE_APP_CONFIG_KEY;

const firebaseConfig = {
    apiKey: firebaseConfigKey,
    authDomain: "real-time-aution.firebaseapp.com",
    projectId: "real-time-aution",
    storageBucket: "real-time-aution.appspot.com",
    messagingSenderId: "773219752625",
    appId: "1:773219752625:web:a463ba7a29dfc606daa090",
    measurementId: "G-780MSKWHHC"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };