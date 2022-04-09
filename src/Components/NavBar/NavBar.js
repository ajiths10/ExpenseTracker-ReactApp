import { useHistory } from 'react-router-dom';
import './NavBar.css';

const NavBar = ()=>{
const history = useHistory();

    const logoutHandler = (event)=>{
        event.preventDefault();
        localStorage.setItem('JWTTOKEN','');
        localStorage.setItem('userID','');
        localStorage.setItem('Email','');
        history.replace('/auth');
    }

    return(<div className='mainDivv'>
        <div className='subDivvH' >Home</div>
        <div className='subDivvP'>Products</div>
        <div className='subDivvA'>About us</div>
        <div className='logoutDiv' > <button onClick={logoutHandler} className='logoutBtn' >LogOut</button> </div>
        <hr className='hrelement'></hr>
    </div>)
}

export default NavBar;