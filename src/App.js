import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./Components/Pages/WelcomePage/Welcome";

function App() {
  return (
    <div >
      <NavBar />
      <Switch>


      <LoginPage path='/auth' />

      <Route path='/welcome'>
      <Welcome />
      </Route>

      <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
