import { useContext, useState } from 'react';
import {  NavLink, useHistory } from 'react-router-dom';
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
        <div className='subDivvH'>
        <NavLink to='/welcome' className='nammeclass' >Home</NavLink>
        </div>
        <div className='subDivvP'>
        <NavLink to='/expenses'className='nammeclass'>Products</NavLink>
        </div>
        <div className='subDivvA'>
        <NavLink to='/' className='nammeclass' >About us</NavLink>
        </div>
        <div className='logoutDiv' > <button onClick={logoutHandler} className='logoutBtn' >{CTX.isLogin? 'LogOut' : 'Login'}</button> </div>
        <hr className='hrelement'></hr>
    </div>)
}

export default NavBar;