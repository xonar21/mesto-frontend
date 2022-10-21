import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.svg';
function Header(props) {
    const loc = useLocation();
    function setLog() {
        props.set(false)
        localStorage.removeItem('jwt')
    }
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="место"/>
            {loc.pathname === '/sign-in' ?
             <Link className='login__switch' to="/sign-up">Зарегистрироваться</Link> : ''}
            {loc.pathname === '/sign-up' ?
             <Link className='login__switch' to="/sign-in">Войти</Link> : ''}
            {props.log ? 
            <div className='login__group'>
                <p className='login__switch' >{props.user}</p>
                <Link onClick={setLog} className='login__switch' to="/sign-in">Выйти</Link>
            </div> :
            ''
            }
              
        </header>
    )
    
}

export default Header