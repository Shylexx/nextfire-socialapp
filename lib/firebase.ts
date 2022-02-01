import firebaseConfig from "./firebaseConfig";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Init firebase
const firebaseApp = initializeApp(firebaseConfig);

// Init auth and firestore with firebaseApp property
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;