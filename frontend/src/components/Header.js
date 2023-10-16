import headerLogo from '../Images/headerLogo.svg'
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header({loggedIn, email, onLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src= {headerLogo} alt="Логотип Mesto Russia"/>
      <nav className='header__nav-container'>
        {loggedIn?
        <div className='header__link-container'>
          <p className='header__text'>{email}</p>
          <button className="header__link header__link_log-out"
          onClick={onLogout}
          >Выйти</button>
        </div>
        :
        <div className='header__link-container'>
          <NavLink to='/sign-up' className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>Регистрация</NavLink>
          <NavLink to='/sign-in' className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>Войти</NavLink>
        </div>
        }
      </nav>
    </header>
  );
}

  export default Header;


