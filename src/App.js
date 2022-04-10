import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import UserDetailsUpdate from "./Components/Pages/UserDetailsUpdate/UserDetailsUpdate";
import PasswordReset from "./Components/Pages/PasswordReset/PasswordReset";
import Expenses from "./Components/Pages/Expenses/Expenses";
import Context from "./Context/Context";
import { useContext } from "react";

function App() {
  const CTX = useContext(Context);

  return (
    <div>
      <NavBar />
      <Switch>
        {!CTX.isLogin &&<Route path="/auth" exact>
         <LoginPage />
        </Route>}
        

        {CTX.isLogin && <Route path="/welcome" exact>
           <Welcome />
        </Route>}

         {CTX.isLogin && <Route path="/user" exact>
         <UserDetailsUpdate />  
        </Route>}

        {!CTX.isLogin && <Route path="/reset" exact>
           <PasswordReset />
        </Route>}

        {CTX.isLogin && <Route path="/expenses" exact>
           <Expenses />
        </Route>}


      </Switch>
    </div>
  );
}

export default App;
