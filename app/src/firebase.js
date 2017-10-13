import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyDRiZbJJQ9H9EO2dwSPEu2_HOZNK1AcPXo",
  authDomain: "my-business-card-b7abb.firebaseapp.com",
  databaseURL: "https://my-business-card-b7abb.firebaseio.com",
  projectId: "my-business-card-b7abb",
  storageBucket: "my-business-card-b7abb.appspot.com",
  messagingSenderId: "37183021582"
};
let firebaseApp = firebase.initializeApp(config);

export const googleProvider  = new firebase.auth.GoogleAuthProvider();
export const database = firebaseApp.database();
export const auth  = firebaseApp.auth();


export default firebaseApp;