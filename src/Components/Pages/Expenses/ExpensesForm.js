import React, { useRef } from "react";

const ExpensesForm = ( props) =>{
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()

    const buttonHandler = (event) => {
        event.preventDefault();

        const data ={
             enteredMoney : moneyRef.current.value,
             enteredDescription: descriptionRef.current.value,
             enteredCategory : categoryRef.current.value,
        }
        props.onClick(data);
    }

    return(
        <div>
            <div>
                <form>
                    <div>
                        <h1>Add Expenses</h1>
                    </div>
                    <div>
                        <label> Money Spent </label>
                    </div>
                    <div>
                        <input type='number' ref={moneyRef} />
                    </div>
                    <div>
                        <label> Description  </label>
                    </div>
                    <div>
                        <input type='text' ref={descriptionRef}  />
                    </div>
                    <div>
                        <label>Category</label>
                    </div>
                    <div>
                        <select ref={categoryRef} >
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={buttonHandler} >Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpensesForm;