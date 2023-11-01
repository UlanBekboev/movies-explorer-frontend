import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  CARDS_SIZES_DESKTOP,
  CARDS_SIZES_TABLET,
  CARDS_SIZES_MOBILE,
  SIZE_DESKTOP_BIG,
  SIZE_DESKTOP,
  SIZE_TABLET,
  SIZE_MOBILE,
  DESKTOP_BIG,
  DESKTOP,
  TABLET,
} from "../../utils/constants";

const MoviesCardList = ({
  cards,
  buttonMore,
  onMovieSave,
  onMovieDelete,
  savedMovies,
  isLoading,
  isSavedMovies,
  isError,
  isNotFound,
}) => {
  const [shownMovies, setShownMovies] = useState(0);

  useEffect(() => {
    const handleResizeDesktop = () => {
      if (window.innerWidth >= DESKTOP_BIG) {
        setShownMovies(SIZE_DESKTOP_BIG);
      } else if (
        window.innerWidth < DESKTOP_BIG &&
        window.innerWidth >= DESKTOP
      ) {
        setShownMovies(SIZE_DESKTOP);
      } else if (window.innerWidth < DESKTOP && window.innerWidth >= TABLET) {
        setShownMovies(SIZE_TABLET);
      } else {
        setShownMovies(SIZE_MOBILE);
      }
    };
    handleResizeDesktop();
  }, []);

  function handleShowMoreCards() {
    if (window.innerWidth >= DESKTOP_BIG) {
      setShownMovies(shownMovies + CARDS_SIZES_DESKTOP);
    } else if (
      window.innerWidth < DESKTOP_BIG &&
      window.innerWidth >= DESKTOP
    ) {
      setShownMovies(shownMovies + CARDS_SIZES_TABLET);
    } else if (window.innerWidth < DESKTOP && window.innerWidth >= TABLET) {
      setShownMovies(shownMovies + CARDS_SIZES_MOBILE);
    } else {
      setShownMovies(shownMovies + CARDS_SIZES_MOBILE);
    }
  }

  function handleSavedStatus(savedMovies, card) {
    return savedMovies.find(
      (savedMovies) => savedMovies.movieId === (card.id || card.movieId)
    );
  }

  return (
    <section className="movies-list">
        {isLoading && cards.length === 0 && <Preloader />}
        {!isLoading && isNotFound && (
          <p className="movies-cards__search-error">Ничего не найдено.</p>
        )}
        {!isLoading && isError && (
          <p className="movies-cards__search-error">
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема
            с&nbsp;соединением или сервер недоступен. Подождите немного
            и&nbsp;попробуйте ещё раз.
          </p>
        )}
        {!isLoading && !isError && !isNotFound && (
          <>
            <ul className="movies-list__cards">
              {cards.slice(0, shownMovies).map((card) => (
                <MoviesCard
                  key={card.id || card.movieId}
                  isSaved={handleSavedStatus(savedMovies, card)}
                  card={card}
                  cards={cards}
                  onMovieSave={onMovieSave}
                  onMovieDelete={onMovieDelete}
                  isSavedMovies={isSavedMovies}
                  savedMovies={savedMovies}
                />
              ))}
            </ul>
  
            {cards.length > shownMovies ? (
              <div className="movies-cards__button-container">
                {buttonMore  && (
                  <button
                    onClick={handleShowMoreCards}
                    className="movies-list__button"
                    type="button"
                    name="button-more"
                  >
                    Ещё
                  </button>
                )}
              </div>
            ) : <div className="saved-devider"></div>}
          </>
        )}
    </section>
  );
};

export default MoviesCardList;
