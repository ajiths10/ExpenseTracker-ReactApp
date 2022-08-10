import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavBar.css";
import { authActions } from "../../store/auth";
import { darkModeActions } from "../../store/darkMode";
import { premiumActions } from "../../store/PremiumBtn";
import { itemsAction } from "../../store/fetchData";
import { useSnackbar } from "notistack";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const ispremium = useSelector((state) => state.premium.preminumValue);

  const setAlert = (response) => {
    enqueueSnackbar(response.message, {
      variant: response.type === 1 ? "success" : "error",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      //   preventDuplicate: true,
    });
  };
  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    dispatch(itemsAction.fetchExpenses([]));
    dispatch(premiumActions.PremiumBtnDeactive());
    dispatch(authActions.logout());
    setAlert({ message: "Logout Success", type: 1 });
    history.replace("/auth");
  };
  console.log(ispremium);
  const checkBoxHandler = (event) => {
    event.preventDefault();
    dispatch(darkModeActions.darkModeToggle());
  };

  return (
    <div className="mainDivv">
      <div className="subDivvH">
        <NavLink to="/welcome" className="nammeclass">
          Home
        </NavLink>
      </div>

      <div className="subDivvP">
        <NavLink to="/expenses" className="nammeclass">
          Expenses
        </NavLink>
      </div>

      {ispremium && (
        <div className="subDivvA">
          <NavLink to="/report" className="nammeclass">
            Report
          </NavLink>
        </div>
      )}
      {ispremium && (
        <div className="subDivvL">
          <NavLink to="/leadership" className="nammeclass">
            Leadership
          </NavLink>
        </div>
      )}
      {ispremium && (
        <div className="container">
          <button onClick={checkBoxHandler} className="toggleBtn">
            Toggle
          </button>
        </div>
      )}

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
