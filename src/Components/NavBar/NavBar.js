import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";
import { authActions } from "../../store/auth";
import { darkModeActions } from '../../store/darkMode';
import { premiumActions } from "../../store/PremiumBtn";
import { itemsAction } from "../../store/fetchData";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const ispremium =useSelector((state)=>state.premium.preminumValue)

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    dispatch(itemsAction.fetchExpenses([]));
    dispatch(premiumActions.PremiumBtnDeactive());
    dispatch(authActions.logout());
    history.replace("/auth");
  };
console.log(ispremium)
  const checkBoxHandler=(event)=>{
      event.preventDefault();
      dispatch(darkModeActions.darkModeToggle());
  }

  return (
    <div className="mainDivv">
      <div className="subDivvH">
        <NavLink to="/welcome" className="nammeclass">
          Home
        </NavLink>
      </div>

      <div className="subDivvP">
        <NavLink to="/expenses" className="nammeclass">
          Products
        </NavLink>
      </div>

      <div className="subDivvA">
        <NavLink to="/about" className="nammeclass">
          About us
        </NavLink>
      </div>

    {ispremium && <div className="container">
        <button onClick={checkBoxHandler} className='toggleBtn'>Toggle</button>
    </div> }

      <div className="logoutDiv">
        <button onClick={logoutHandler} className="logoutBtn">
          {isLogin ? "LogOut" : "Login"}
        </button>
      </div>
      <hr className="hrelement"></hr>
    </div>
  );
};

export default NavBar;
