import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () =>{
    return(
    <div className="WelcomebackgroundDiv" >
        <div className="headingh1">
            <div>
                <h1 >Welcome to Expense Tracker</h1>
            </div>
            <div className="message">
                <label className="labelText" > Your Profile is Incomplete. <Link to='/user' className="ComleteNow" >Complete Now</Link> </label>
            </div>
        </div>
    </div>)
}

export default Welcome;