import './MoviesCard.css';
import film from '../../images/pic__COLOR_pic.svg'

function MoviesCard() {
  return (
    <li className="card">
      <img src={film} alt="" className="card__image" />
      <p className="card__description">33 слова о дизайне</p>
      <button className="card__saved"></button>
      <div className="card__duration">1ч42м</div>
    </li>
  )
}

export default MoviesCard;