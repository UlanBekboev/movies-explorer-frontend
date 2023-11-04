import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { DESKTOP_VERSION, TABLET_VERSION, MOBILE_VERSION, DESKTOP, TABLET, MINITABLET } from '../../utils/constants';

function MoviesCardList({
  handleLikeClick,
  handleCardDelete,
  isLoading,
  isNotFound,
  isReqError,
  isSavedFilms,
  savedMovies,
  cards,
}) {

  const [shownCards, setShownCards] = useState(0);
  const { pathname } = useLocation();

  function cardsCount() {
    const display = window.innerWidth;
    if (display > DESKTOP) {
      setShownCards(16);
    } else if (display > TABLET) {
      setShownCards(12);
    }  else if (display > MINITABLET) {
        setShownCards(8);
    } else if (display < TABLET) {
      setShownCards(5);
    }
  }

  function showMoreCards() {
    const display = window.innerWidth;
    if (display > DESKTOP) {
      setShownCards(shownCards + DESKTOP_VERSION);
    } else if (display > TABLET) {
      setShownCards(shownCards + TABLET_VERSION);
    }
    else if (display < TABLET) {
      setShownCards(shownCards + MOBILE_VERSION);
    }
  }

  useEffect(() => {
    cardsCount();
    console.log(isNotFound)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', cardsCount);
    }, 500);
  });

  return (
    <section className="movies-list">
      {isLoading && cards.length === 0 && <Preloader />}
        {!isLoading && isNotFound && (
          <p className="movies-cards__search-error">Ничего не найдено.</p>
        )}
        {!isLoading && isReqError && (
          <p className="movies-cards__search-error">
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема
            с&nbsp;соединением или сервер недоступен. Подождите немного
            и&nbsp;попробуйте ещё раз.
          </p>
        )}
        {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === '/saved-movies' ? (
            <>
              <ul className="movies-list__cards">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    handleLikeClick={handleLikeClick}
                    card={card}
                    cards={cards}
                    handleCardDelete={handleCardDelete}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="movies-list__cards">
                {(!!cards) ? cards.slice(0, shownCards).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    handleLikeClick={handleLikeClick}
                    card={card}
                    cards={cards}
                    handleCardDelete={handleCardDelete}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                )) : ""}
              </ul>
                {(!!cards && cards.length > shownCards) ? (
                  <button className="movies-list__button" onClick={showMoreCards}>
                    Ещё
                  </button>
                ) : (
                  ''
                )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;

