import React from "react";
import headerLogo from "../../images/logo (1).svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import './Header.css';

const Header = ({ isLoggedIn }) => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${
      pathname === '/' ? "header-blue" : "header-light"
    }`}>
      <Link to="/" className="header__logo">
        <img src={headerLogo} alt="Логотип страницы" className="logo"/>
      </Link>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  ) 
}

export default Header;