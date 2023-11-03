import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchLogo from '../../images/find.svg';

function SearchForm({ handleSearchMovies, onFilter, isShortMovies }) {
  const [queryError, setQueryError] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const { pathname } = useLocation();
  const [moviesFound, setMoviesFound] = useState(true); // Добавляем состояние для отслеживания наличия фильмов

  useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setMovieQuery(localQuery);
    }
  }, [pathname]);

  function handleChangeQuery(e) {
    setMovieQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (movieQuery.length === 0) {
      setQueryError(true);
    } else {
      setQueryError(false);
      handleSearchMovies(movieQuery, setMoviesFound); // Передаем функцию setMoviesFound для обновления состояния
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__container" id="form" onSubmit={handleSubmit}>
        <input
          name="query"
          className="search-form__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={handleChangeQuery}
          value={movieQuery || ''}
        />
        <button className="search-form__button" type="submit">
          <img
            className="search-form__logo"
            src={searchLogo}
            alt="Логотип поиска: лупа"
          />
        </button>
      </form>
      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies} />
      {!moviesFound && <span className="search-form__error">Фильмы по запросу не найдены</span>}
      {queryError && <span className="search-form__error">Нужно ввести ключевое слово</span>}
    </section>
  );
}

export default SearchForm;

