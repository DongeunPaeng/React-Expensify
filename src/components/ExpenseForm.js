import React from "react";
import { DatePicker } from "rsuite";
import { DateTime } from "luxon";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense.description ? props.expense.description : "",
      note: props.expense.note ? props.expense.note : "",
      amount: props.expense.amount ? props.expense.amount : "",
      createdAt: props.expense.createdAt
        ? DateTime.fromMillis(props.expense.createdAt).ts
        : DateTime.local(),
      message: undefined
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    this.setState(() => ({ amount }));
  };

  onDateChange = date => {
    const createdAt = DateTime.fromISO(date.toISOString()).ts;
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        message: "please provide description and amount"
      }));
    } else {
      this.setState(() => ({ message: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseInt(this.state.amount),
        createdAt: this.state.createdAt,
        notes: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.message && <p>{this.state.message}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <DatePicker onChange={this.onDateChange} />
          <textarea
            placeholder="type something(optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
