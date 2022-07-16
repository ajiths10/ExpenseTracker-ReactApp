import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer =()=>{
    return(
    <div className='footerdiv'>
        <h2>Expense Tracker</h2>
        <div className="footer-AboutDiv">
        <NavLink to="/about" className="aboutLink">
          About us
        </NavLink>
      </div>
    </div>)
}

export default Footer;