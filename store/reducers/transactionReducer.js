import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../actions/types";

const initialState = {
  transactions: [
    { addedtime: 1639807200000, id: 2, title: "Health", price: -40 },
    { addedtime: 1639720800000, id: 3, title: "Transportation", price: -10 },
    { addedtime: 1639720800000, id: 4, title: "Salary / Income", price: 2000 },
    { addedtime: 1639634400000, id: 5, title: "Other", price: -60 },
    { addedtime: 1639634400000, id: 6, title: "Transportation", price: -10 },
    { addedtime: 1639548000000, id: 7, title: "Other", price: -20 },
    { addedtime: 1639548000000, id: 9, title: "Health", price: -200 },
    { addedtime: 1639548000000, id: 10, title: "Salary / Income", price: 1000 },
    { addedtime: 1639116000000, id: 11, title: "Household", price: -100 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};
