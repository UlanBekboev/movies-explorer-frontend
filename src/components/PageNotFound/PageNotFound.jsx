import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="pagenotfound">
      <div className="pagenotfound__container">
        <div className="pagenotfound__error">404</div>
        <div className="pagenotfound__text">Страница не найдена</div>
        <div className="pagenotfound__button">Назад</div>
      </div>
    </div>
  )
}

export default PageNotFound;