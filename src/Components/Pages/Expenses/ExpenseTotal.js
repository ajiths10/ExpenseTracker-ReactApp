import './ExpenseTotal.css' 
import { useDispatch ,useSelector } from 'react-redux';
import { premiumActions } from '../../../store/PremiumBtn';

const ExpenseTotal = () => {
  const items = useSelector(state=>state.itemsData.itemList);
  const isPremium = useSelector(state=>state.premium.isPremium)
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

  return (
    <div className='maindiv'>
      <div>
        <h2>Total Expenses</h2>
      </div>
      <div className='amountdiv' >
        <label >{totalAmount}.00 </label>
      </div>
      {isPremium && <div className='preminumDiv'>
      <button className='preminumBTN'>Premium Button.</button>
      </div>}
    </div>
  );
};

export default ExpenseTotal;
