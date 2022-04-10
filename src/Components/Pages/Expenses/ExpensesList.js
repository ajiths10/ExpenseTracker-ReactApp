const ExpensesList = (props) => {
    console.log(props);
    return(<div>
        <div>
            <h2>{props.category}</h2>
        </div>
        <div>
            <label> {props.description}</label>
        </div>
        <div>
            <label> {props.money}</label>
        </div>
        <hr></hr>
    </div>)
}

export default ExpensesList;