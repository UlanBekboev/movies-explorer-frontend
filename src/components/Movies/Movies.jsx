import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

const movies = [
  {
    id: '1',
    name: '33 слова о дизайне',
    image: 'images/first-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    image: 'images/second-movie.png',
    duration: '1ч 17м',
    saved: true
  },
  {
    id: '3',
    name: 'В погоне за Бенкси',
    image: 'images/third-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '4',
    name: '33 слова о дизайне',
    image: 'images/first-movie.png',
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '5',
    name: 'Киноальманах «100 лет дизайна»',
    image: 'images/second-movie.png',
    duration: '1ч 17м',
    saved: false
  },
];

const Movies = () => {

  const [isLoading, setIsLoading] = useState(false);
  function handlePreloaderChange() {
    setIsLoading(true);
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList isSaved={false} cards={movies} isLoading={isLoading}/>
    </section>
  );
};

export default Movies;