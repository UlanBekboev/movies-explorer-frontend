import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as movies from '../../utils/MoviesApi';
import { filterMovies, durationFilter } from '../../utils/utils';
import SearchError from '../SearchError/SearchError';
import Preloader from '../Preloader/Preloader';

function Movies({
  handleLikeClick,
  handleCardDelete,
  savedMovies 
}) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReqError, setIsReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short);
    setInitialMovies(moviesList);
    if (moviesList.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false);
    };
    setFilteredMovies(short ? durationFilter(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (durationFilter(initialMovies).length === 0) {
        setFilteredMovies(durationFilter(initialMovies));
      } else {
        setFilteredMovies(durationFilter(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isShortMovies);
  }

  function handleSearchMovies(query) {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortMovies);

    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      movies.getCards()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShortMovies);
          setIsReqError(false);
        })
        .catch((err) => {
          setIsReqError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(durationFilter(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <section className="movies">
          <SearchForm
          handleSearchMovies={handleSearchMovies}
          onFilter={handleShortMovies}
          isShortMovies={isShortMovies}
          savedMovies={savedMovies} /> 
          <MoviesCardList
            handleLikeClick={handleLikeClick}
            handleCardDelete={handleCardDelete}
            savedMovies={savedMovies}
            cards={filteredMovies}
            isSavedFilms={false}
            isLoading={isLoading}
            isReqError={isReqError}
            isNotFound={isNotFound}
            query={localStorage.getItem('movieSearch')}
          />
        
    </section>
  );
}

export default Movies;


 