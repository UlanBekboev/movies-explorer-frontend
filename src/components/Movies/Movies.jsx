import "./Movies.css";
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import { SHORT_DURATION } from "../../utils/constants";

function Movies({ handleMovieLike, onMovieDelete, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  //найденные по запросу фильмы
  const [initialMovies, setInitialMovies] = useState([]);
  //отфильтрованные короткометражки
  const [foundShortMovies, setFoundShortMovies] = useState([]);
  //активность чекбокса короткометражек
  const [isShortMovies, setIsShortMovies] = useState(false);
  //ошибка от сервера
  const [isError, setIsError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handleFilterMovies(movies, searchName) {
    const search = searchName.toLowerCase().trim();
    const result = movies.filter((movie) => {
      const movieNameRU = String(movie.nameRU).toLowerCase().trim();
      const movieNameEN = String(movie.nameEN).toLowerCase().trim();
      return movieNameRU.includes(search) || movieNameEN.includes(search);
    });
    return result;
  }

  function handleFilterMoviesDuration(movies) {
    return movies.filter((movie) => movie.duration <= SHORT_DURATION);
  }

  function handleSearchSubmit(movies, searchName, isShort) {
    const moviesList = handleFilterMovies(movies, searchName);
    moviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    setInitialMovies(moviesList);
    setFoundShortMovies(
      isShort ? handleFilterMoviesDuration(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("moviesList", JSON.stringify(moviesList));
  }

  function handleGetMovies(search) {
    moviesApi
      .getMovies()
      .then((data) => {
        handleSearchSubmit(data, search, isShortMovies);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMoviesSearch(search) {
    localStorage.setItem("movieSearch", search);
    localStorage.setItem("shortMoviesCheckbox", isShortMovies);

    if (localStorage.getItem("movies")) {
      handleSearchSubmit(
        JSON.parse(localStorage.getItem("movies")),
        search,
        isShortMovies
      );
    } else {
      setIsLoading(true);
      handleGetMovies(search);
    }
  }

  useEffect(() => {
    localStorage.getItem("movieSearch")
      ? foundShortMovies.length === 0
        ? setIsNotFound(true)
        : setIsNotFound(false)
      : setIsNotFound(false);
  }, [foundShortMovies]);

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    localStorage.setItem("shortMoviesCheckbox", !isShortMovies);
    !isShortMovies
      ? handleFilterMoviesDuration(initialMovies).length === 0
        ? setFoundShortMovies(handleFilterMoviesDuration(initialMovies))
        : setFoundShortMovies(handleFilterMoviesDuration(initialMovies))
      : setFoundShortMovies(initialMovies);
  }

  useEffect(() => {
    if (localStorage.getItem("moviesList")) {
      const movies = JSON.parse(localStorage.getItem("moviesList"));
      setInitialMovies(movies);
      localStorage.getItem("shortMoviesCheckbox") === "true"
        ? setFoundShortMovies(handleFilterMoviesDuration(movies))
        : setFoundShortMovies(movies);
    }
  }, []);

  useEffect(() => {
    localStorage.getItem("shortMoviesCheckbox") === "true"
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, []);

  return (
    <main className="movies">
      <SearchForm
        onMoviesSearch={handleMoviesSearch}
        onMoviesFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        cards={foundShortMovies}
        isSavedMovies={false}
        isLoading={isLoading}
        isError={isError}
        isNotFound={isNotFound}
        onMovieSave={handleMovieLike}
        onMovieDelete={onMovieDelete}
        buttonMore={true}
      />
    </main>
  );
}

export default Movies;