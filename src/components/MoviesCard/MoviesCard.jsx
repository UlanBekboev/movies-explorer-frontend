import React, { useEffect, useState } from "react";
import './MoviesCard.css';
import { durationConverter } from "../../utils/utils";

function MoviesCard({ card, isSavedFilms, handleLikeClick, handleCardDelete, savedMovies }) {
  const isMovieSaved = savedMovies.some((movie) => movie.movieId === card.id);
  const [saved, setSaved] = useState(isMovieSaved);

  function onCardClick() {
    if (saved) {
      handleCardDelete(card, setSaved);
    } else {
      handleLikeClick(card, saved, setSaved);
    }
  }

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === card.id)){
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedMovies, card.id]);

  function onDelete() {
    handleCardDelete(card);
  }

  return (
    <li className="card">
      <a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__image"
          alt={card.nameRU}
          src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
        />
      </a>
      <div className="card__container">
        <figcaption className="card__flex-row">
          <h2 className="card__description">{card.nameRU}</h2>
          {isSavedFilms ? (
          <button
            type="button"
            className="card__delete-icon"
            onClick={onDelete}>
          </button>
        ) : (
          <button
            type="button"
            className={`${saved ? 'card__save-icon card__save-icon_active' : 'card__save-icon'}`}
            onClick={onCardClick} >
          </button>
        )}
        </figcaption>
        <p className="card__duration">{durationConverter(card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
