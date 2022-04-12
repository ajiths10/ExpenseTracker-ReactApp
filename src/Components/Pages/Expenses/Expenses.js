import { useDispatch ,useSelector } from "react-redux";
import ExpensesForm from "./ExpensesForm";
import Card from "../../../UI/Card";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import ExpenseTotal from "./ExpenseTotal";
import { itemsAction } from "../../../store/fetchData";

const Expenses = () => {
  const dispatch = useDispatch();
  const itemsX = useSelector(state=> state.itemsData.itemList);

console.log(itemsX)


  const itemsList = itemsX.map((element) => {
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
       <ExpenseTotal />
      </Card>

      <Card>
        <ExpensesForm onClick={''} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;
