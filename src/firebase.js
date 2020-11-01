import * as firebase from 'firebase' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLRq8_DdZEm2v9WDj64cUhodOxDhWYDB8",
    authDomain: "clone-57370.firebaseapp.com",
    databaseURL: "https://clone-57370.firebaseio.com",
    projectId: "clone-57370",
    storageBucket: "clone-57370.appspot.com",
    messagingSenderId: "1096296659242",
    appId: "1:1096296659242:web:cc0f6e380cddef74d78653",
    measurementId: "G-J53LNLFKDP"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()

  const auth = firebase.auth()

  export { db, auth };