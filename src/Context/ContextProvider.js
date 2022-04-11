import React, { useEffect, useState } from "react";
import axios from 'axios';
import Context from "./Context";

const ContextProvider = (props) =>{

    const [isLogin ,setLogin ]= useState(false);
    const [isEditOn, setEdit] =useState(false);
    const [values , setValues] = useState('');
    const [items, setItems] = useState([]);
    const [total,setTotal] = useState(0);

    //set login status
    const loginHandler = (value) =>{
        setLogin(value);
    }

    //check login or not
    useEffect(()=>{
        const localIsLogin = localStorage.getItem('JWTTOKEN');
        if(localIsLogin ===null){
            setLogin(false);
        }else if(localIsLogin === ''){
            setLogin(false);
        }else if(localIsLogin.trim().length > 0){
            setLogin(true);
        }
    },[])

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
          setItems([...arr]);
          
        }catch(err){
          console.log(`Some error ${err}`);
        }
      }
    useEffect(()=>{
      autoreloadExpenses();
    },[]);

    //for calculate total Amount
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



   //Adding new by state
    const itemsHandler = (data) => {
    setItems([...items, data]);
    };


    const contextData={
        isLogin: isLogin,
        login: loginHandler,
        editable: editHandler,
        editValues:values,
        isEditOn:isEditOn,
        editStateFunction:setEdingState,
        items:items,
        total:total,
        itemsSetup:itemsHandler,
        forReload:autoreloadExpenses,
        
    }

    return(<Context.Provider value={contextData}>
        {props.children}
    </Context.Provider>
    )
}

export default ContextProvider;
