import "./SavedMovies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, onMovieDelete }) {
  const [isSearch, setIsSearch] = useState("");
  const [foundShortMovies, setFoundShortMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    !isShortMovies
      ? handleFilterMoviesDuration(savedMovies).length === 0
        ? setFoundShortMovies(handleFilterMoviesDuration(savedMovies))
        : setFoundShortMovies(handleFilterMoviesDuration(savedMovies))
      : setFoundShortMovies(savedMovies);
  }

  function handleFilterMoviesDuration(movies) {
    return movies.filter((movie) => movie.duration <= 52);
  }

  function handleMoviesSearch(search) {
    setIsSearch(search);
  }

  function handleFilterMovies(movies, searchName) {
    const search = searchName.toLowerCase().trim();
    const result = movies.filter((movie) => {
      const movieNameRU = String(movie.nameRU).toLowerCase().trim();
      const movieNameEN = String(movie.nameEN).toLowerCase().trim();
      return movieNameRU.includes(search) || movieNameEN.includes(search);
    });
    return result;
  }

  useEffect(() => {
    foundShortMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
  }, [foundShortMovies]);

  useEffect(() => {
    const newMoviesList = handleFilterMovies(savedMovies, isSearch);
    isShortMovies
      ? setFoundShortMovies(handleFilterMoviesDuration(newMoviesList))
      : setFoundShortMovies(newMoviesList);
  }, [savedMovies, isShortMovies, isSearch]);

  return (
    <main className="saved-movies">
      <SearchForm
        onMoviesSearch={handleMoviesSearch}
        onMoviesFilter={handleShortMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        cards={foundShortMovies}
        isSavedMovies={true}
        isNotFound={isNotFound}
        onMovieDelete={onMovieDelete}
        buttonMore={true}
      />
    </main>
  );
}

export default SavedMovies;