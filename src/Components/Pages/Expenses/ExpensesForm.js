import React, { useRef } from "react";
import axios from 'axios';
import './ExpensesForm.css';

const ExpensesForm = ( props) =>{
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()

    const buttonHandler = async(event) => {
        event.preventDefault();

        const data ={
             enteredMoney : moneyRef.current.value,
             enteredDescription: descriptionRef.current.value,
             enteredCategory : categoryRef.current.value,
        }
        const userId = localStorage.getItem('userID');
        props.onClick(data);

        try{
            const res = axios.post(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`,data);
            console.log(res);
        }catch(err){
            console.log(`Some error ${err}`);
        }


    }

    return(
        
            <div className="mainDivform">
                <form className="mainformele">
                    <div>
                        <h2>Add Expenses</h2>
                    </div>
                    <div className="moneyDiv">
                        <label> Money Spent </label>
                    </div>
                    <div>
                        <input type='number' className="moneyinput" ref={moneyRef} placeholder='Amount'/>
                    </div>
                    <div className="disdiv">
                        <label> Description  </label>
                    </div>
                    <div>
                        <input type='text'   ref={descriptionRef}placeholder='Description' className="Divinput" />
                    </div>
                    <div className="catadiv">
                    <div >
                        <label>Category</label>
                    </div>
                    <div className="selectdiv">
                        <select ref={categoryRef} className="select">
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className="submitdivv">
                        <button onClick={buttonHandler}  className="submitdivbtn" >Add</button>
                    </div>
                </form>
            </div>
        
    )
}

export default ExpensesForm;