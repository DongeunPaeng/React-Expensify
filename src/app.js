import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "rsuite/dist/styles/rsuite-default.css";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// for the test purpose...
import { addExpense } from "./actions/expenses";

store.dispatch(addExpense({ description: "water bill", amount: 45000 }));
store.dispatch(addExpense({ description: "gas bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "rent", amount: 109500 }));

ReactDOM.render(jsx, document.getElementById("app"));
