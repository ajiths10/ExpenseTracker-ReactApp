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
            <div className='moneyItemslabels'><label  > {props.money}</label></div>
        </div>
        <hr className= 'hrelementss'></hr>
    </div>)
}

export default ExpensesList;