import React, { useEffect, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { authActions } from './store/auth';
import './App.css';
import Loading from "./Components/Pages/Loading/Loading";

const Welcome = React.lazy(()=>import('./Components/Pages/WelcomePage/Welcome'));
const PasswordReset =React.lazy(()=>import( "./Components/Pages/PasswordReset/PasswordReset"));
const UserDetailsUpdate = React.lazy(()=>import("./Components/Pages/UserDetailsUpdate/UserDetailsUpdate"))
const Expenses = React.lazy(()=>import("./Components/Pages/Expenses/Expenses"));
const LoginPage = React.lazy(()=>import("./Components/Pages/LoginPage/LoginPage"));


function App() {
  const dispatch = useDispatch();
  const login = useSelector(state=>state.auth.isAuthenticated);
  const darkMode =useSelector(state=>state.darkMode.isDarkMode);


  useEffect(()=>{
    dispatch(authActions.checker());
  },[])

  return (
    <Suspense fallback={<Loading />}>
    <div className={darkMode? "invert" : ''}>
      <div className="bgColorApp">
  
      <NavBar />
      <Switch>
        {!login &&<Route path="/auth" exact>
         <LoginPage />
        </Route>}
        

        {login && <Route path="/welcome" exact>
           <Welcome />
        </Route>}
        <Route path='/about' exact>
          <Loading />
        </Route>

         {login && <Route path="/user" exact>
         <UserDetailsUpdate />  
        </Route>}

        {!login && <Route path="/reset" exact>
           <PasswordReset />
        </Route>}

        {login && <Route path="/expenses" exact>
           <Expenses />
        </Route>}

        <Route path='*' exact>
          {login && <Redirect to='/expenses'></Redirect>}
          { !login && <Redirect to='/auth'></Redirect>}
        </Route>

      </Switch>
      <Footer/>
      </div>
    </div>
    </Suspense>
  );
}

export default App;
