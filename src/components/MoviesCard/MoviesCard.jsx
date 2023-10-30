import './MoviesCard.css';
import film from '../../images/pic__COLOR_pic.svg';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <li className="card">
      <img src={film} alt="" className="card__image" />
      <p className="card__description">33 слова о дизайне</p>
      {pathname === '/saved-movies' ? (
        <button className="card__delete-icon"></button>
      ) : (
        <button className="card__save-icon"></button>
      )}
      <div className="card__duration">1ч42м</div>
    </li>
  )
}

export default MoviesCard;