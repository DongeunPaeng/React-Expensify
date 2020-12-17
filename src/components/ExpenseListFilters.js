import React from "react";
import { connect } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByDate,
  sortByAmount
} from "../actions/filters";
import { DateRangePicker } from "rsuite";
import { DateTime } from "luxon";

export class ExpenseListFilters extends React.Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value); // the dispatch function receives actions, which is defined in actions folder by actionCreators(very important concept).
  };
  onSortChange = e => {
    if (e.target.value === "date") {
      this.props.sortByDate(); // this dispatch will send the given action to reducer and ask the reducer to return updated state.
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };
  onDateChange = date => {
    this.props.setStartDate(DateTime.fromISO(date[0].toISOString()).ts);
    this.props.setEndDate(DateTime.fromISO(date[1].toISOString()).ts);
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              placeholder="Search Expenses"
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker onChange={this.onDateChange} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

// connect does this thing: it connects the React component with Redux store, by receiving mapStateToProps and mapDispatchToProps functions. Thus, the React component receives 'store' as the props.
// mapStateToProps does this thing: it enables the React component to reach Redux store and bring any data from it with the form of 'props.'
