import React, { useEffect, useState } from "react";
import axios from 'axios';
import Context from "./Context";
import { useDispatch } from "react-redux";
import { itemsAction } from "../store/fetchData";

const ContextProvider = (props) =>{
const dispatch = useDispatch();
    const [isEditOn, setEdit] =useState(false);
    const [values , setValues] = useState('');
  

    //set login status


    //check login or not
 

    //find edit enable or not
    const setEdingState =(value)=>{
        setEdit(value)
    }

    const editHandler=(values)=>{
    setValues(values);
    setEdingState(true);
    }

    //fetch data from bankend 
    const autoreloadExpenses = async() =>{
        const userId = localStorage.getItem('userID');
        try{
          const res =await axios.get(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}.json`)
          const data =res.data;
          let arr=[];
          let index=0;
          for(const key in data){
            
            arr[index]={
              enteredCategory:data[key].enteredCategory,
              enteredDescription:data[key].enteredDescription,
              enteredMoney:data[key].enteredMoney,
              id:key,

            }
            index++;
          }
          
         dispatch(itemsAction.fetchExpenses(arr))
        }catch(err){
          console.log(`Some error ${err}`);
        }
      }
    useEffect(()=>{
      autoreloadExpenses();
    },[]);

    //for calculate total Amount



    const contextData={
        editable: editHandler,
        editValues:values,
        isEditOn:isEditOn,
        editStateFunction:setEdingState,    
        forReload:autoreloadExpenses,
        
    }

    return(<Context.Provider value={contextData}>
        {props.children}
    </Context.Provider>
    )
}

export default ContextProvider;
