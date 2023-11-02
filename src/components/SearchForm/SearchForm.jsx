import { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';
import { useLocation } from 'react-router-dom';
import searchLogo from '../../images/find.svg';

const SearchForm = ({
  onSearchMovies,
  onFilter,
  disabled,
  isSavedMoviesPage,
  shortMovies,
}) => {
  const { enteredValues, handleChange, resetForm, isFormValid } = useFormValidation();
  const location = useLocation();

  function handleFormSubmit(e) {
    e.preventDefault();
    onSearchMovies(enteredValues.searchRequest, isFormValid, shortMovies);
  }

  function handleSavedMoviesFormSubmit(e) {
    e.preventDefault()
    onSearchMovies(enteredValues.searchRequest, shortMovies, resetForm);
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const searchValue = localStorage.getItem('movieSearch');
      enteredValues.searchRequest = searchValue;
    }
  }, [location]);

  return (
    <section className='search-form'>  
      <form className='search__form__container' name='search-saved-movie-form' onSubmit={handleSavedMoviesFormSubmit} noValidate>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          required
          name='searchRequest'
          disabled={disabled}
          value={enteredValues.searchRequest || ''}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='search-form__button'
          disabled={disabled}
        >
          <img
            className="search-form__logo"
            src={searchLogo}
            alt="Логотип поиска: лупа"
          />
        </button>
      </form>

      <FilterCheckbox isMovieFilter={shortMovies} onFilter={onFilter} disabled={disabled} />
    </section>
  )
};

export default SearchForm;
