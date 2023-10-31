import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="pagenotfound">
      <div className="pagenotfound__container">
        <div className="pagenotfound__error">404</div>
        <div className="pagenotfound__text">Страница не найдена</div>
        <Link to="/" className="pagenotfound__button">
          Назад
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound;