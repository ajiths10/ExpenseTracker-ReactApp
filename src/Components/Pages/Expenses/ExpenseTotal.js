import { CSVLink } from 'react-csv';
import { useDispatch ,useSelector } from 'react-redux';
import { premiumActions } from '../../../store/PremiumBtn';
import './ExpenseTotal.css' 


const ExpenseTotal = () => {
  const items = useSelector(state=>state.itemsData.itemList);
  const isPremium = useSelector(state=>state.premium.isPremium)
  const pActive = useSelector(state=>state.premium.preminumValue)
  const dispatch = useDispatch();
  let totalAmount=0;

  items.map((element)=>{
     totalAmount += Number(element.enteredMoney);
  })

  if(totalAmount>10000 ){
    dispatch(premiumActions.PremiumBtnActive());
  }else{
    dispatch(premiumActions.PremiumBtnDeactive())
  }

  const activatePreminum =(event)=>{
      event.preventDefault();
      console.log('activate')
      dispatch(premiumActions.activatePremium());
  }

 
     const csvData = [...items];
   
  return ( 

    <div className='maindiv'>
      <div>
        <h2>Total Expenses</h2>
        
      </div>
      <div className='amountdiv' >
        <label >{totalAmount}.00 </label>
      </div>
      {isPremium && <div className='preminumDiv'>
      <button className='preminumBTN' onClick={activatePreminum}>Premium Button.</button>
      </div>}
      
      {pActive && <div className='downloadBTnDiv' ><CSVLink data ={csvData}><button className='downloadBTn'> 🡇 Download file</button></CSVLink>  </div>}
    </div>
  );
};

export default ExpenseTotal;
