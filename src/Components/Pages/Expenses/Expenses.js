import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import {  useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseTotal from "./ExpenseTotal";

const Expenses = () => {
  const [items, setItems] = useState([]);

  const itemsHandler = (data) => {
    setItems([...items, data]);
  };
  
  const itemsList = items.map((element) => {
    return (
        
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
      />
      
    );
  });

  return (
    <div className="expensesMaindiv">
        <div className="expensesheading">
        <h1> Expense Tracker</h1>
        </div>
      <Card>
       <ExpenseTotal />
      </Card>

      <Card>
        <ExpensesForm onClick={itemsHandler} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;
