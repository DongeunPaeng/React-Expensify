import filtersReducer from "../../reducers/filters";
import { DateTime } from "luxon";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: DateTime.local().startOf("month").ts,
    endDate: DateTime.local().endOf("month").ts
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, {
    type: "SORT_BY_AMOUNT"
  });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, {
    type: "SORT_BY_DATE"
  });
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: "test"
  });
  expect(state.text).toBe("test");
});

test("should set startDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: 1000
  });
  expect(state.startDate).toEqual(1000);
});

test("should set endDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: 1000
  });
  expect(state.endDate).toEqual(1000);
});
