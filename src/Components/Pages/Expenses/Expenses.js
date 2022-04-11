import {  useContext , useEffect } from "react";
import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseTotal from "./ExpenseTotal";
import Context from "../../../Context/Context";

const Expenses = () => {
  const CTX = useContext(Context);
  
  const auto = () =>{
    CTX.forReload()
  }
  useEffect(auto,[]);

  const itemsli = CTX.items;


  const itemsList = itemsli.map((element) => {
    return (
        
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
        id={element.id}
        key={element.id}
      />
      
    );
  });



  return (
    <div className="expensesMaindiv">
        <div className="expensesheading">
        <h1> Expense Tracker</h1>
        </div>
      <Card>
       <ExpenseTotal total={CTX.total}/>
      </Card>

      <Card>
        <ExpensesForm onClick={''} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;
