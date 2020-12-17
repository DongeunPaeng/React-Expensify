import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/"); // 이게 뭐더라?
  };
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

// If there is nothing to read from the Redux store, I don't need to put mapStateToProps argument here in the connect function.
// To understand this better, I need to know what role mapStateToProps has.
// The main role of mapStateToProps is "to subscribe" the Redux state. It is unknown if it is needed to pass Redux state to React component, too.
// Like mapStateToProps passes state as props to React component, mapDispatchToProps passes dispatch as props. So, unless there is something to specify like state.expenses, dispatch.removeItem, I can just make it null.
// The important concept here is if I need to specify state.xxx or dispatch.xxx, which determines whether I need to pass mapState/DispatchToProps arguments.
