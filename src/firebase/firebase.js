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

const notes = {
  1: {
    id: "12",
    title: "First note!",
    body: "This is my note"
  },
  2: {
    id: "384734",
    title: "Second note!",
    body: "This is my note"
  }
};

db.collection("database")
  .doc("notes")
  .set(notes);