import './ExpenseTotal.css' 

const ExpenseTotal = (props) => {
  return (
    <div className='maindiv'>
      <div>
        <h2>Total Expenses</h2>
      </div>
      <div className='amountdiv' >
        <label >{props.total}.00 </label>
      </div>
    </div>
  );
};

export default ExpenseTotal;
