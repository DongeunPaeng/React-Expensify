import React from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>{description}</Link>
    <p>
      {numeral(amount).format("0,0")}원 -{" "}
      {DateTime.fromMillis(createdAt).toLocaleString()}
    </p>
  </div>
);

export default ExpenseListItem;
