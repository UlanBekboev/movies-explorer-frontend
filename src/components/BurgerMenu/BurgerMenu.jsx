import React from "react";
import { NavLink, Link } from "react-router-dom";
import close from '../../images/Group.svg';
import './BurgerMenu.css';

function BurgerMenu({ closePopups }) {

  return (
    <div className="burger-menu">
      <div className="burger-menu__container">
      <img src={close} alt="Кнопка закрыть меню" aria-label="закрыть"
         type="button" className="burger-menu__close" onClick={closePopups}/>
        <nav className="burger-menu__content">
          <NavLink to="/" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Главная</NavLink>
          <NavLink to="/movies" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Сохранённые фильмы</NavLink>
        </nav>
        <Link to="/profile" className="burger-menu__account">
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default BurgerMenu;
