import React, { useEffect, useState} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies, durationFilter } from '../../utils/utils';

function SavedMovies({ handleCardDelete, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? durationFilter(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);
  return (
    <main className="saved-movies">
        <SearchForm
        onFilter={handleShortMovies}
        handleSearchMovies={handleSearchMovies} />
        {savedMovies.length === 0 ? (
          <p className="saved-movies__message">Сохраненных фильмов нету</p>
        ) : (
          <MoviesCardList
            isNotFound={isNotFound}
            isSavedFilms={true}
            cards={filteredMovies}
            savedMovies={savedMovies}
            handleCardDelete={handleCardDelete}
          />
        )}
    </main>
  );
}

export default SavedMovies;
