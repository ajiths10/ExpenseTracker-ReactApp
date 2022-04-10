import './ExpensesList.css';

const ExpensesList = (props) => {
    console.log(props);
    return(<div className='maindivitems'>
        <div className='maindivitemsh3'>
            <h3>{props.category}</h3>
        </div>
        <div className='maindivitemsdis'>
            <label> {props.description}</label>
        </div>
        <div className='moneyItemsdiv'>
            <label  className='moneyItemslabel'> {props.money}</label>
        </div>
        <hr></hr>
    </div>)
}

export default ExpensesList;