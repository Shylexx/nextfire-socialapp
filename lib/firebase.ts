import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBofdmUVYHg1Eei42zXPAtB9W8yoVyfS6Q",
    authDomain: "nextsocial-app-17bef.firebaseapp.com",
    projectId: "nextsocial-app-17bef",
    storageBucket: "nextsocial-app-17bef.appspot.com",
    messagingSenderId: "511822486688",
    appId: "1:511822486688:web:bf5053651c14bb87fe7dc5",
    measurementId: "G-JBZFXR5XYK"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


  