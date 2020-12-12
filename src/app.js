import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import "rsuite/dist/styles/rsuite-default.css";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./styles/styles.css";
import { firebase } from "./firebase/firebase";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(
  <div className="spinner"></div>,
  document.getElementById("app")
);
store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById("app"));
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const name = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    console.log(name, email, emailVerified);
  } else {
    history.push("/");
  }
});
