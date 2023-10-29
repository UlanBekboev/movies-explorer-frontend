import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__element">
          <a href="#about-project" className="link">
            О проекте
          </a>
        </li>
        <li className="nav-tab__element">
        <a href="#techs" className="link">
          Технологии
          </a>
        </li>
        <li className="nav-tab__element">
        <a href="#about-me" className="link">
          Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab;