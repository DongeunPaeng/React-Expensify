import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";
import { DateTime } from "luxon";

test("should generate set start date action object", () => {
  const action = setStartDate(DateTime.local(2020, 9, 27));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: DateTime.local(2020, 9, 27)
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(DateTime.local(2020, 9, 27));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: DateTime.local(2020, 9, 27)
  });
});

test("should generate set text filter action object with text value", () => {
  const action = setTextFilter("text");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "text"
  });
});

test("should generate set text filter action object without text value", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});

test("should generate action object for sort by amount", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT",
    sortBy: "amount"
  });
});

test("should generate action object for sort by date", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE",
    sortBy: "date"
  });
});
