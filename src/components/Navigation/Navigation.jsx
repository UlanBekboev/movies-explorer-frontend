import React, { useState } from "react";
import './Navigation.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = ({ isLoggedIn }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const onOpenMenu = () => {
    setIsBurgerMenuOpen(true);
  }

  const handleCloseMenu = () => {
    setIsBurgerMenuOpen(false);
  }

  return (
      isLoggedIn ? (
        <nav className="nav">
          <ul className="nav__content">
            <li>
              <NavLink
                to="/movies"
                className={({isActive}) => `nav__link ${isActive ? "nav__link_active" : ""}`}
              >
                фильмы
              </NavLink>
            </li>     
            <li>
              <NavLink
                to="/saved-movies"
                className={({isActive}) => `nav__link ${isActive ? "nav__link_active" : ""}`}
              >
                Сохранённые фильмы
              </NavLink>    
            </li>        
          </ul>
          <button className="nav__account">
            Аккаунт
          </button>
          {!isBurgerMenuOpen ? (
            <button className="nav__burger-menu" type="button" aria-label="Открыть меню" onClick={onOpenMenu}></button>
            ) : <BurgerMenu onClose={handleCloseMenu} />}
        </nav>
    ) : (
        <ul className="nav__auth">
          <li className="nav-auth__item">
            <Link to="/sign-up" className="nav-auth__sign-up">Регистрация</Link>
          </li>
          <li className="nav-auth__item">
            <Link to="/sign-in">
              <button type="button" className="nav-auth__sign-in">Войти</button>
            </Link>    
          </li>
        </ul>
      )
    )
  }
  /* isLoggedIn ? (
    <nav className="nav">
      <ul className="nav__content">
        <li>
          <NavLink
            to="/movies"
            isActive={(match, location) => {
              if (!match) return false;
              return location.pathname === "/movies";
            }}
            className="nav__link"
          >
            фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            isActive={(match, location) => {
              if (!match) return false;
              return location.pathname === "/saved-movies";
            }}
            className="nav__link"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <button className="nav__account">
        Аккаунт
      </button>
      {!isBurgerMenuOpen ? (
        <button className="nav__burger-menu" type="button" aria-label="Открыть меню" onClick={onOpenMenu}></button>
      ) : <BurgerMenu onClose={onOpenMenu} />}
    </nav>
  ) : (
    <ul className="nav-auth">
      <li className="nav-auth__item">
        <Link to="/sign-up" className="nav-auth__sign-up">Регистрация</Link>
      </li>
      <li className="nav-auth__item">
        <Link to="/sign-in">
          <button type="button" className="nav-auth__sign-in">Войти</button>
        </Link>
      </li>
    </ul>
  )
);
} */

export default Navigation;