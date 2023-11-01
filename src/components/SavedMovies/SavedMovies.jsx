import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SavedMovies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default SavedMovies;