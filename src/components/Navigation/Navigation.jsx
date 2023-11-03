import React, { useState } from "react";
import './Navigation.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = ({ loggedIn }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const onOpenMenu = () => {
    setIsBurgerMenuOpen(true);
  }

  const handleCloseMenu = () => {
    setIsBurgerMenuOpen(false);
  }

  return (
    loggedIn ? (
        <nav className="nav">
          <ul className="nav__content">
            <li>
              <NavLink
                to="/movies"
                className={
                  ({isActive}) => `nav__link ${
                    pathname === '/movies' ||
                    pathname === '/saved-movies' ||
                    pathname === '/profile'
                    ? 'nav__link_light'
                    : ''} 
                    ${isActive ? "nav__link_active" : ""}`
                }
              >
                фильмы
              </NavLink>
            </li>     
            <li>
              <NavLink
                to="/saved-movies"
                className={({isActive}) => `nav__link ${
                  pathname === '/movies' ||
                  pathname === '/saved-movies' ||
                  pathname === '/profile'
                  ? 'nav__link_light'
                  : ''} 
                  ${isActive ? "nav__link_active" : ""}`}
              >
                Сохранённые фильмы
              </NavLink>    
            </li>        
          </ul>
          <Link to="/profile" className="nav__account">
            Аккаунт
          </Link>
          {!isBurgerMenuOpen ? (
            <button className={`nav__burger-menu ${
              pathname === '/' 
                && 'nav__burger-menu_light'
            }`} type="button" aria-label="Открыть меню" onClick={onOpenMenu}></button>
            ) : <BurgerMenu closePopups={handleCloseMenu} />}
        </nav>
    ) : (
        <ul className="nav__auth">
          <li className="nav__item">
            <Link to="/sign-up" className="nav__sign-up">Регистрация</Link>
          </li>
          <li className="nav__item">
            <Link to="/sign-in">
              <button type="button" className="nav__sign-in">Войти</button>
            </Link>    
          </li>
        </ul>
      )
    )
  }

export default Navigation;