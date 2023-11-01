import './PageNotFound.css';
import { Link, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1, {replace: true});
  }

  return (
    <div className="pagenotfound">
      <div className="pagenotfound__container">
        <div className="pagenotfound__error">404</div>
        <div className="pagenotfound__text">Страница не найдена</div>
        <button type="button" onClick={handleGoBack} className="pagenotfound__button">
          Назад
        </button>
      </div>
    </div>
  )
}

export default PageNotFound;