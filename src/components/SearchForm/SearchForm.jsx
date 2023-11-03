import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchLogo from '../../images/find.svg';

function SearchForm({ handleSearchMovies, onFilter, isShortMovies }) {
  const [queryError, setQueryError] = useState(false);
  const [movieQuery, setMovieQuery] = useState('');
  const { pathname } = useLocation();

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
      handleSearchMovies(movieQuery);
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
          >
        </input>
        <button className="search-form__button" type="submit">
        <img
            className="search-form__logo"
            src={searchLogo}
            alt="Логотип поиска: лупа"
          />
        </button>
      </form>
      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies} />
      {queryError && <span className="search-form__error">Нужно ввести ключевое слово</span>}
    </section>
  );
}

export default SearchForm;
