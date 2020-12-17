import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">
        There are <span>{numeral(expenseCount).format("0,0")}</span> expenses totalling{" "}
        KRW <span>{numeral(expensesTotal).format("0,0")}</span>
      </h1>
      <div className="page-header__actions">
        <Link to="/create" className="button">
          Add Expense
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
