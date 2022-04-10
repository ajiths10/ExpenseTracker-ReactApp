import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import { useState } from "react";
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
