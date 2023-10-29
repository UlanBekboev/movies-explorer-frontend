import './BurgerMenu.css';
import close from '../../images/Group.svg'
import { NavLink } from 'react-router-dom';

function BurgerMenu({ onClose }) {
  return (
    <div className="burger-menu">
      <div className="burger-menu__container">
        <img src={close} alt="" className="burger-menu__close" onClick={onClose}/>
        <nav className="burger-menu__content">
          <NavLink to="/" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Главная</NavLink>
          <NavLink to="/movies" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({isActive}) => `burger-menu__item ${isActive ? "burger-menu__item_active" : ""}`}>Сохранённые фильмы</NavLink>
        </nav>
        <div className="burger-menu__account">Аккаунт</div>
      </div>
    </div>
  )
}

export default BurgerMenu;