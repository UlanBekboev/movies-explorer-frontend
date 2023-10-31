import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cards, isSaved, isLoading }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-list">
      {isLoading ? (
        <Preloader />
      ) : (
      <ul className="movies-list__cards">
         {cards.map((card) => (
           <MoviesCard key={card.id} card={card} isSavedMoviesPage={isSaved}/>
           ))}
      </ul>
      )}

      {pathname === '/saved-movies'
      ? <div className="saved-devider"></div> 
      : <button type="button" className="movies-list__button">Ещё</button>}
    </section>   
  )
}

export default MoviesCardList;