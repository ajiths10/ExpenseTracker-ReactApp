import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseTotal from "./ExpenseTotal";
import { itemsAction } from "../../../store/fetchData";
import Context from "../../../Context/Context";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Expenses = () => {
  const dispatch = useDispatch();
  const paginationFetch = useContext(Context);
  const { forReload } = paginationFetch;
  const [rows, setRows] = useState(10);

  const itemsX = useSelector((state) => state.itemsData.itemList);
  const pagination = useSelector((state) => state.pagination.expensePagination);

  useEffect(() => {
    const fetchedRows = localStorage.getItem("rowsPerPage");
    if (fetchedRows) {
      setRows(fetchedRows);
    }
  }, []);

  const nextProducts = () => {
    forReload(pagination.nextPage, rows);
  };
  const previousProducts = () => {
    forReload(pagination.previousPage, rows);
  };

  const handleChange = (event) => {
    setRows(event.target.value);
    localStorage.setItem("rowsPerPage", event.target.value);
    forReload(1, event.target.value);
  };

  return (
    <div className="expensesMaindiv">
      <div className="expensesheading">
        <h1> Expense Tracker</h1>
      </div>
      <Card>
        <ExpenseTotal />
      </Card>

      <Card>
        <ExpensesForm onClick={""} />
      </Card>
      <Card>
        <>
          {itemsX.length?  itemsX.map((element) => {
            return (
              <ExpensesList
                money={element.amount}
                description={element.description}
                category={element.category}
                id={element.id}
                key={element.id}
              />
            );
          }): <h3 className="noExpenseContainer">No Expenses</h3>}
        </>
        <div></div>
        <div className="pagination-container">
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-autowidth-label">
              Rows per page
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={rows}
              onChange={handleChange}
              autoWidth
              label="Rows per page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          {pagination?.previousPage ? (
            <button className="paginationBtn" onClick={previousProducts}>
              {"<"}
            </button>
          ) : null}
          <button className="paginationBtn">
            {pagination?.currentPage ? pagination.currentPage : 0}
          </button>
          {pagination?.nextPage ? (
            <button className="paginationBtn" onClick={nextProducts}>
              {">"}
            </button>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default Expenses;
