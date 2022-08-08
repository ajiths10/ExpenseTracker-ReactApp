import React, { useEffect, useState } from "react";
import axios from "axios";
import Context from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/fetchData";
import { paginationAction } from "../store/pagination";

const ContextProvider = (props) => {
  const dispatch = useDispatch();
  const [isEditOn, setEdit] = useState(false);
  const [values, setValues] = useState("");
  const login = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("JWTTOKEN");

  //find edit enable or not
  const setEdingState = (value) => {
    setEdit(value);
  };

  const editHandler = (values) => {
    setValues(values);
    setEdingState(true);
  };

  //fetch data from bankend
  const autoreloadExpenses = async (value, rows) => {
    const userId = localStorage.getItem("userID");
    const rowlocal = localStorage.getItem("rowsPerPage");
    const rowsPerPage = {
      rowsPerPage: rows ? rows : rowlocal ? rowlocal : 10,
      page: value ? value : 1,
    };
    try {
      const res = await axios.post(
        `http://localhost:7777/auth/api/userexpenses`,
        rowsPerPage,
        { headers: { Authorization: token } }
      );
      const data = res.data.response.userExpenses.rows;
      console.log(data);
      let arr = [];
      let index = 0;

      for (const key in data) {
        arr[index] = {
          category: data[key].category,
          description: data[key].description,
          amount: data[key].amount,
          id: data[key].id,
        };
        index++;
      }

      dispatch(itemsAction.fetchExpenses(arr));
      dispatch(paginationAction.setExpensePagination(res.data.response));
    } catch (err) {
      console.log(`Some error ${err}`);
    }
  };

  useEffect(() => {
    const fetchedRows = localStorage.getItem("rowsPerPage");
    if (fetchedRows) {
      autoreloadExpenses(1, fetchedRows);
    } else {
      autoreloadExpenses(1, 10);
    }
  }, [token, login]);
  //for calculate total Amount

  const contextData = {
    editable: editHandler,
    editValues: values,
    isEditOn: isEditOn,
    editStateFunction: setEdingState,
    forReload: autoreloadExpenses,
  };

  return (
    <Context.Provider value={contextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
