import './SearchForm.css';
import searchLogo from '../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          required
        />
        <button type="submit" className="search-form__button">
          <img
            className="search-form__logo"
            src={searchLogo}
            alt="Логотип поиска: лупа"
          />
        </button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;