import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render ExpensesSummary correctly", () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={195} />)
  expect(wrapper).toMatchSnapshot();
});
