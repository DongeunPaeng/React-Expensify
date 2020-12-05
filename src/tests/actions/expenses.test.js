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

const expenseData = {
  description: "TEST",
  amount: 100,
  createdAt: 1000,
  notes: "Test with test DB"
};

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

let docId;

test("should add expense to database and store", done => {
  const store = createMockStore({});
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    docId = actions[0].expense.id;
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    done();
  });
});

test("should add expense to database", async () => {
  let emptyArray = [];
  await db
    .collection("expenses")
    .doc(docId)
    .get()
    .then(doc => {
      emptyArray.push(doc.data());
    });
  expect(emptyArray[0]).toEqual(expenseData);
});
