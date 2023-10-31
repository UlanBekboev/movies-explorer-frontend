import './MoviesCard.css';
import film from '../../images/pic__COLOR_pic.svg';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const { pathname } = useLocation();

  const handleSave = () => {
    const element = document.querySelector(".card__save-icon");
    element.classList.toggle("card__save-icon_active");
  }
  
  return (
    <li className="card">
      <img src={film} alt="фильм 33 слова о дизайне" className="card__image" />
      <div className="card__container">
        <div className="card__flex-row">
          <p className="card__description">33 слова о дизайне</p>
          {pathname === '/saved-movies' ? (
            <button type="button" className="card__delete-icon"></button>
          ) : (
            <button type="button" onClick={handleSave} className="card__save-icon"></button>
          )}
        </div>
        <div className="card__duration">1ч42м</div>
      </div>
    </li>
  )
}

export default MoviesCard;