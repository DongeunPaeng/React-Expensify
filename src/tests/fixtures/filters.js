import { DateTime } from "luxon";

const filters = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const altFilters = {
  text: "bills",
  sortBy: "amount",
  startDate: DateTime.local(2020, 10, 10),
  endDate: DateTime.local(2020, 12, 10)
};

export { filters, altFilters };
