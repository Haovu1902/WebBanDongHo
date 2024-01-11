import firebase from "firebase";
import "firebase/auth"
 const firebaseConfig = {
    apiKey: "AIzaSyB4rqz3xWxvx-hkt9Tgwlctl1KnSmRm58Q",
    authDomain: "devcam-23.firebaseapp.com",
    projectId: "devcam-23",
    storageBucket: "devcam-23.appspot.com",
    messagingSenderId: "201436370885",
    appId: "1:201436370885:web:c9ed9606f2483a0f1c5dac"
  };
  firebase.initializeApp(firebaseConfig);
   
  export const auth = firebase.auth();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider;