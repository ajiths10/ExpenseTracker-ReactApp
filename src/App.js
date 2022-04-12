import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import UserDetailsUpdate from "./Components/Pages/UserDetailsUpdate/UserDetailsUpdate";
import PasswordReset from "./Components/Pages/PasswordReset/PasswordReset";
import Expenses from "./Components/Pages/Expenses/Expenses";
import Footer from "./Components/Footer/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { authActions } from './store/auth';


function App() {
  const dispatch = useDispatch();
  const login = useSelector(state=>state.auth.isAuthenticated)

  useEffect(()=>{
    dispatch(authActions.checker());
  },[])

  return (
    <div>
      <NavBar />
      <Switch>
        {!login &&<Route path="/auth" exact>
         <LoginPage />
        </Route>}
        

        {login && <Route path="/welcome" exact>
           <Welcome />
        </Route>}

         {login && <Route path="/user" exact>
         <UserDetailsUpdate />  
        </Route>}

        {!login && <Route path="/reset" exact>
           <PasswordReset />
        </Route>}

        {login && <Route path="/expenses" exact>
           <Expenses />
        </Route>}

      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
