import configureMockStore from "redux-mock-store";
import "@babel/polyfill";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import db from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

const expenseData = {
  description: "ADD_TEST",
  amount: 100,
  createdAt: 1000,
  notes: "Test with test DB"
};

beforeEach(async () => {
  expenses.forEach(({ id, description, amount, createdAt, notes }) => {
    db.collection("expenses")
      .doc(id)
      .set({ description, amount, createdAt, notes });
  });
  await db
    .collection("expenses")
    .where("description", "==", "ADD_TEST")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        db.collection("expenses")
          .doc(doc.id)
          .delete();
      });
    })
    .catch(err => {
      console.log("error deleting docs...", err);
    });
});

afterEach(() => {
  db.collection("expenses")
    .where("description", "==", "ADD_TEST")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        db.collection("expenses")
          .doc(doc.id)
          .delete();
      });
    })
    .catch(err => {
      console.log("error deleting docs...", err);
    });
});

test("should setup removeExpense action object", () => {
  const id = "123abc";
  const action = removeExpense(id);
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove expense from database and store", done => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense(id)).then(async () => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id
    });
    await db
      .collection("expenses")
      .doc(id)
      .get()
      .then(doc => {
        expect(doc.data()).toBeUndefined();
        done();
      })
      .catch(err => done(err));
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
  store.dispatch(startAddExpense(expenseData)).then(async () => {
    const actions = store.getActions();
    docId = actions[0].expense.id;
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    let emptyArray = [];
    await db
      .collection("expenses")
      .doc(docId)
      .get()
      .then(doc => {
        emptyArray.push(doc.data());
      })
      .catch(err => {
        console.log(err);
      });
    expect(emptyArray[0]).toEqual(expenseData);
    done();
  });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses[2]);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses: expenses[2]
  });
});

test("should fetch the expenses from database", () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0].expenses[0]).toEqual(expenses[0]);
  });
});
