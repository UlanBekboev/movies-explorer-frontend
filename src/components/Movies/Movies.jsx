import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useState } from 'react';

const Movies = () => {
  const [isSaved, setIsSaved] = useState(true);

  const onSave = () => {
    setIsSaved(false);
  }
  return (
    <main className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList isSaved={onSave}/>
      <Footer />
    </main>
  );
};

export default Movies;