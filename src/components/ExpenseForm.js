import React from "react";
import { DatePicker } from "rsuite";
import { DateTime } from "luxon";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense
        ? props.expense.description
          ? props.expense.description
          : ""
        : "",
      note: props.expense ? (props.expense.note ? props.expense.note : "") : "",
      amount: props.expense
        ? props.expense.amount
          ? props.expense.amount
          : ""
        : "",
      createdAt: props.expense
        ? props.expense.createdAt
          ? DateTime.fromMillis(props.expense.createdAt).ts
          : DateTime.local()
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
        message: "Please provide description and amount."
      }));
    } else {
      this.setState(() => ({ message: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseInt(this.state.amount),
        createdAt: this.state.createdAt,
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.message && (
          <p className="form__message">{this.state.message}</p>
        )}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="number"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <DatePicker onChange={this.onDateChange} />
        <textarea
          className="textarea"
          placeholder="type something(optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
