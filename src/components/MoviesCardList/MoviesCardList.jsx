import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isSaved}) {
  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {isSaved && <MoviesCard />}
        {isSaved && <MoviesCard />}
        {isSaved && <MoviesCard />}
        {isSaved && <MoviesCard />}
        {isSaved && <MoviesCard />}
        {isSaved && <MoviesCard />}
      </ul>
      {!isSaved ? <button className="movies-list__button">Ещё</button> : <div className="saved-devider"></div>}
    </section>   
  )
}

export default MoviesCardList;