import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../Context/Context';
import './NavBar.css';

const NavBar = ()=>{
const history = useHistory();
const CTX = useContext(Context);

    const logoutHandler = (event)=>{
        event.preventDefault();
        localStorage.setItem('JWTTOKEN','');
        localStorage.setItem('userID','');
        localStorage.setItem('Email','');
        CTX.login(false);
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