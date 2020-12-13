import authReducer from "../../reducers/auth";

test("should setup default auth values", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set up a uid", () => {
  const uid = '1234'
  const state = authReducer(undefined, { type: "LOGIN", uid });
  expect(state.uid).toEqual(uid);
});

test("should clear all uid", () => {
  const state = authReducer({ uid: "anything" }, { type: "LOGOUT" });
  expect(state).toEqual({});
});
