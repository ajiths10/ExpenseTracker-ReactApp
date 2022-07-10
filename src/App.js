import React, { useEffect, Suspense } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { authActions } from "./store/auth";
import "./App.css";
import axios from "axios";
import Loading from "./Components/Pages/Loading/Loading";
import { premiumActions } from "./store/PremiumBtn"
import { SnackbarProvider } from "notistack";
import Leadership from "./Components/Pages/Leadership";
const dotenv = require("dotenv");
dotenv.config();

const Welcome = React.lazy(() =>
  import("./Components/Pages/WelcomePage/Welcome")
);
const PasswordReset = React.lazy(() =>
  import("./Components/Pages/PasswordReset/PasswordReset")
);
const UserDetailsUpdate = React.lazy(() =>
  import("./Components/Pages/UserDetailsUpdate/UserDetailsUpdate")
);
const Expenses = React.lazy(() =>
  import("./Components/Pages/Expenses/Expenses")
);
const LoginPage = React.lazy(() =>
  import("./Components/Pages/LoginPage/LoginPage")
);

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const token = localStorage.getItem("JWTTOKEN");

  const userFetch = async () => {
    if (login) {
      const res = await axios.get(
        "http://localhost:7777/auth/user/api/verify",
        
        { headers: { Authorization: token } }
      );
      console.log(res);
      if(res.data.response.isPreminum){
        console.log("inside")
        dispatch(premiumActions.activatePremium()); 
      }
      if (
        res.data.response.name &&
        res.data.response.name === "TokenExpiredError" ||
        res.data.response.name === "JsonWebTokenError"
      ) {
        localStorage.setItem("JWTTOKEN", "");
        localStorage.setItem("userID", "");
        localStorage.setItem("Email", "");

        dispatch(authActions.logout());
        history.replace("/auth");
      }
    }
  };
  useEffect(() => {
    userFetch();
  }, [token,login]);

  useEffect(() => {
    dispatch(authActions.checker());
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className={darkMode ? "invert" : ""}>
        <div className="bgColorApp">
          <SnackbarProvider maxSnack={3}>
            <NavBar />
            <Switch>
              {!login && (
                <Route path="/auth" exact>
                  <LoginPage />
                </Route>
              )}

              {login && (
                <Route path="/welcome" exact>
                  <Welcome />
                </Route>
              )}
              <Route path="/about" exact>
                <Loading />
              </Route>

              {login && (
                <Route path="/user" exact>
                  <UserDetailsUpdate />
                </Route>
              )}
              {login && (
                <Route path="/leadership" exact>
                  <Leadership />
                </Route>
              )}

              {!login && (
                <Route path="/reset" exact>
                  <PasswordReset />
                </Route>
              )}

              {login && (
                <Route path="/expenses" exact>
                  <Expenses />
                </Route>
              )}

              <Route path="*" exact>
                {login && <Redirect to="/expenses"></Redirect>}
                {!login && <Redirect to="/auth"></Redirect>}
              </Route>
            </Switch>
            <Footer />
          </SnackbarProvider>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
