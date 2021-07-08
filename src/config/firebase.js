


import firebase from "firebase/app";
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCRGOxScR4Z2MNKlN-_sKcTxGJxmbgPAM0",
    authDomain: "crud-tareas-246ab.firebaseapp.com",
    projectId: "crud-tareas-246ab",
    storageBucket: "crud-tareas-246ab.appspot.com",
    messagingSenderId: "849120399047",
    appId: "1:849120399047:web:26cab1648e45307053b8e2"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore()