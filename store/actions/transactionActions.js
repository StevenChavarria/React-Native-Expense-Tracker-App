import moment from "moment";
import { ADD_TRANSACTION, DELETE_TRANSACTION } from "./types";

export const addTransaction = ({ title, price}) => (dispatch) => {
  const id = Math.floor(Math.random() * 600000);
 
  const newTransaction = {
    id,
    title,
    price: +price,
    addedtime: mainTime(),
  };

  dispatch({ type: ADD_TRANSACTION, payload: newTransaction });
};

export const deleteTransaction = (id) => (dispatch) => {
  dispatch({ type: DELETE_TRANSACTION, payload: id });
};

export const mainTime = () => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  const MiliTime = year + "-" + pad(month) + "-" + pad(day);

  return moment(`${MiliTime}T00:00:00`).valueOf();
};
