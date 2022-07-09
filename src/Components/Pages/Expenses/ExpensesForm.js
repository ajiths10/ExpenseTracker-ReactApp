import React, { useRef, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Context from "../../../Context/Context";
import './ExpensesForm.css';
import { itemsAction } from "../../../store/fetchData";
import { useSnackbar } from "notistack";

const ExpensesForm = ( props) =>{
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const CTX = useContext(Context);
    const moneyRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
  const { enqueueSnackbar } = useSnackbar();

    const setAlert = (response) => {

        enqueueSnackbar(response.message, {
          variant: response.type === 1 ? "success" : "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        //   preventDuplicate: true,
        });
      };    

    const buttonHandler = async(event) => {
        event.preventDefault();
        setLoading(true);
        const data ={
             amount : moneyRef.current.value,
             description: descriptionRef.current.value,
             category : categoryRef.current.value,
        }
        
        const token = localStorage.getItem('JWTTOKEN');
        
        if(moneyRef.current.value !=='' && 
        descriptionRef.current.value !=='' 
        ){
            try{
                
                const res = await axios.post(`http://localhost:7777/auth/api/addexpense`,data,{ headers: { "Authorization" : token}});
                console.log(res);
                setAlert(res.data);
                dispatch(itemsAction.newExpenses(data));
            }catch(err){
                console.log(`Some error ${err}`);
            }
        }else{
            alert('Input fields are empty!');
        }
        setLoading(false);
    }
    if(CTX.isEditOn){
        // console.log(CTX.editValues);
        moneyRef.current.value=CTX.editValues.money;
        descriptionRef.current.value=CTX.editValues.description;
        categoryRef.current.value=CTX.editValues.category;
        
    }
    const editBTNHandler =async(event)=>{
        event.preventDefault();
        CTX.editStateFunction(false);

        if(CTX.isEditOn){
            let id = CTX.editValues.id;
            const userIdEdit = localStorage.getItem('userID');
            const data={
                amount: moneyRef.current.value,
                description: descriptionRef.current.value,
                category:categoryRef.current.value
            }
            setLoading(true);
            try{
                const res = await axios.put(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userIdEdit}/${id}.json`,data)
                console.log(res);
                console.log('delete success');
                moneyRef.current.value='';
                descriptionRef.current.value='';
                categoryRef.current.value='';
                CTX.forReload();
            }catch(err){
                console.log(`Some error ${err}`);
            }
            setLoading(false);
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
                        {!CTX.isEditOn && <button onClick={buttonHandler}  className="submitdivbtn" > {isLoading? 'Loading...':'Submit'} </button>}
                       {CTX.isEditOn && <button onClick={editBTNHandler}  className="submitdivbtn" >{isLoading? 'Loading...':'Update'}</button>}
                    </div>
                </form>
            </div>
        
    )
}

export default ExpensesForm;