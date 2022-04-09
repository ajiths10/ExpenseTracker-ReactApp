import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./Components/Pages/WelcomePage/Welcome";
import UserDetailsUpdate from "./Components/Pages/UserDetailsUpdate/UserDetailsUpdate";

function App() {
  return (
    <div >
      <NavBar />
      <Switch>


      <LoginPage path='/auth' />

      <Route path='/welcome'>
      <Welcome />
      </Route>
      <Route path={'/user'}>
        <UserDetailsUpdate />
      </Route>

      <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
