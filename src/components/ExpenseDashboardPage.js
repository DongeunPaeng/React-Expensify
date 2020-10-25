import React from "react";
import ExpenseSummary from "./ExpensesSummary";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseList from "./ExpenseList";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
