import axios from 'axios';
import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import {  useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseTotal from "./ExpenseTotal";

const Expenses = () => {
  const [items, setItems] = useState([]);
  const [total,setTotal] = useState(0);
  const itemsHandler = (data) => {
    setItems([...items, data]);
  };

  const autoreloadExpenses = async() =>{
    const userId = localStorage.getItem('userID');
    try{
      const res =await axios.get(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`)
      const data =res.data;
      let arr=[];
      let index=0;
      for(const key in data){
        arr[index]=data[key];
        index++;
      }
      setItems([...arr]);

    }catch(err){
      console.log(`Some error ${err}`);
    }
  }
useEffect(()=>{
  autoreloadExpenses();
},[]);
  
  const itemsList = items.map((element) => {
    return (
        
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
      />
      
    );
  });
  let totalAmount=0;
  const totalCal =()=>{
    items.map((element)=>{
      totalAmount = totalAmount + Number(element.enteredMoney);
    })
    setTotal(totalAmount);
    
  }

 useEffect(()=>{
   totalCal();
 },[items])

  return (
    <div className="expensesMaindiv">
        <div className="expensesheading">
        <h1> Expense Tracker</h1>
        </div>
      <Card>
       <ExpenseTotal total={total}/>
      </Card>

      <Card>
        <ExpensesForm onClick={itemsHandler} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;
