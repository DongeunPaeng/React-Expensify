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
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

// export const startSetExpenses;
