import firebase from "firebase";

const prodConfig = {
  apiKey: "AIzaSyCn-cceGK_-7DkaL_0PB3MbpaAT0Gj9zr0",
    authDomain: "go-barber-2b2f7.firebaseapp.com",
    projectId: "go-barber-2b2f7",
    storageBucket: "go-barber-2b2f7.appspot.com",
    messagingSenderId: "1069112480934",
    appId: "1:1069112480934:web:5c5a6e76a63cbc30e51067",
    measurementId: "G-1SN4Q5EB57"
};

const devConfig = {
  apiKey: "AIzaSyCn-cceGK_-7DkaL_0PB3MbpaAT0Gj9zr0",
    authDomain: "go-barber-2b2f7.firebaseapp.com",
    projectId: "go-barber-2b2f7",
    storageBucket: "go-barber-2b2f7.appspot.com",
    messagingSenderId: "1069112480934",
    appId: "1:1069112480934:web:5c5a6e76a63cbc30e51067",
    measurementId: "G-1SN4Q5EB57"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
