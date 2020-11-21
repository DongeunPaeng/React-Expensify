import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk-MXKjHmeluikYKCIvnTLlO2lgkTm05o",
  authDomain: "expensify-137b4.firebaseapp.com",
  databaseURL: "https://expensify-137b4.firebaseio.com",
  projectId: "expensify-137b4",
  storageBucket: "expensify-137b4.appspot.com",
  messagingSenderId: "716318864073",
  appId: "1:716318864073:web:4daa11c287b2dcbd669318",
  measurementId: "G-JH8VZYN9MS"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db as default };

// READ
// db.collection("expenses")
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => {
//       console.log(doc.data());
//     });
//   });
//
// // CREATE
// db.collection("expenses").add({
//   name: "car",
//   amount: 750000
// });
