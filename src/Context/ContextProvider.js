import React, { useEffect, useState } from "react";
import Context from "./Context";

const ContextProvider = (props) =>{

    const [isLogin ,setLogin ]= useState(false);
    const [isEditOn, setEdit] =useState(false);
    const [values , setValues] = useState('');

    const loginHandler = (value) =>{
        setLogin(value);
    }

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
    const setEdingState =(value)=>{
        setEdit(value)
    }

    const editHandler=(values)=>{

    setValues(values);
    setEdingState(true);
    }

    const contextData={
        isLogin: isLogin,
        login: loginHandler,
        editable: editHandler,
        editValues:values,
        isEditOn:isEditOn,
        editStateFunction:setEdingState,
    }

    return(<Context.Provider value={contextData}>
        {props.children}
    </Context.Provider>
    )
}

export default ContextProvider;