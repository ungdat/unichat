import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCPxsPS8JFWpmAJSjTjisUwpexcyAWHkaM",
    authDomain: "unichat-a800a.firebaseapp.com",
    projectId: "unichat-a800a",
    storageBucket: "unichat-a800a.appspot.com",
    messagingSenderId: "444913981009",
    appId: "1:444913981009:web:2231db355a0b8eddae0a70",
  })
  .auth();
