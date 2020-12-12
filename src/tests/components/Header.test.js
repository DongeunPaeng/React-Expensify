import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

let startLogout, wrapper;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test("should render Header correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should logout when button is clicked", () => {
  wrapper.find("button").simulate("click");
  expect(startLogout).toHaveBeenCalled();
});
