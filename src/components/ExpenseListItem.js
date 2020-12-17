import React from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">
        {DateTime.fromMillis(createdAt).toLocaleString()}
      </span>
    </div>
    <h3 className="list-item__data">{numeral(amount).format("0,0")}원</h3>
  </Link>
);

export default ExpenseListItem;
