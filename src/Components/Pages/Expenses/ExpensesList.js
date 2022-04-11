import {  useContext } from 'react';
import axios from 'axios';
import Context from '../../../Context/Context';
import './ExpensesList.css';


const ExpensesList = (props) => {
    const CTX = useContext(Context);

    const deleteBtnHandler = async(event) =>{
        event.preventDefault();
        const userId = localStorage.getItem('userID');
        try{
            const res = await axios.delete(`https://expensetracker-userdata-default-rtdb.firebaseio.com/expenses/${userId}/${props.id}.json`)
            console.log(res);
            console.log('Expense successfuly deleted');
        }catch(err){
            console.log(`Some error ${err}`);
        }
    }

    const editBtnHandler = (event)=>{
        event.preventDefault();

        CTX.editable(props);
    }


    return(<div className='maindivitems'>
        <div className='maindivitemsh3'>
            <h3>{props.category}</h3>
        </div>
        <div className='maindivitemsdis'>
            <label> {props.description}</label>
        </div>
        <div className='moneyItemsdiv'>
            <div className='moneyItemslabels'><label  > {props.money} </label></div>
            <div><button onClick={deleteBtnHandler}>Delete</button></div>
            <div><button onClick={editBtnHandler}>Edit</button></div>
        </div>
        <hr className= 'hrelementss'></hr>
    </div>)
}

export default ExpensesList;