import db from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

// ASYNC ACTION (that returns a function that dispatches another function that returns the final object)
export const startAddExpense = (expenseData = {}) => {
  return async dispatch => {
    const {
      description = "",
      notes = "",
      amount = 0,
      createdAt = 0
    } = expenseData;

    // ADD EXPENSE TO FIRESTORE
    const expense = { description, notes, amount, createdAt };

    await db
      .collection("expenses")
      .add(expense)
      .then(doc => {
        dispatch(
          addExpense({
            id: doc.id,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = id => {
  return async dispatch => {
    await db
      .collection("expenses")
      .doc(id)
      .delete()
      .then()
      .catch(err => console.log("err happened deleting a doc...", err));
    dispatch(removeExpense(id));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return async dispatch => {
    let expenses = [];
    await db
      .collection("expenses")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          expenses.push({
            id: doc.id,
            ...doc.data()
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
    dispatch(setExpenses(expenses));
  };
};
