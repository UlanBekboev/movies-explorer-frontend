import { useState, useEffect } from 'react';
import './MoviesCard.css';
import { convertMinToHours } from '../../utils/utils';
import useScreenWidth from '../../hooks/useScreenWidth';

const MoviesCard = ({
  isSavedMoviesPage,
  movie,
  onSave,
  onDelete,
  saved
}) => {
  const screenWidth = useScreenWidth();
  const handleSaveCard = () => {
    onSave(movie);
  };

  const handleDeleteCard = () => {
    onDelete(movie);
  };

  return (
    <div className='card'>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img
          src={isSavedMoviesPage ?
            movie.image :
            `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={`Обложка фильма: ${movie.nameRU}`}
          className='card__image'
        />
      </a>
      <div className='card__container'> 
        <div className="card__flex-row">
          <p className="card__description">{movie.nameRU}</p>
          {saved && !isSavedMoviesPage ?
            <button type='button' className='card__save-icon' onClick={handleSaveCard} /> : (
            <button className='card__delete-icon' type='button' onClick={handleDeleteCard} />
            )
          }
        </div> 
        <span className='card__duration'>{convertMinToHours(movie.duration)}</span>
      </div>
      
    </div>
  )
};

export default MoviesCard;
