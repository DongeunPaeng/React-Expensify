import configureMockStore from "redux-mock-store";
import "babel-polyfill";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should setup removeExpense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should setup editExpense action object", () => {
  const action = editExpense("123abc", { notes: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { notes: "New note value" }
  });
});

test("should setup addExpense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

// TODO(dongeun.paeng): Complete the test with firestore. Resolve the unhandled promise issue.
test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 100,
    createdAt: 1000,
    notes: "Test directly with DB"
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    const returnedData = db
      .collection("expenses")
      .get()
      .then(a => a.forEach(doc => doc.data()))
      .catch(err => done());
    expect(returnedData).toEqual("");
    done();
  });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    amount: 0,
    notes: "",
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    done();
  });
});

// Gave up testing firestore interaction with jest.
