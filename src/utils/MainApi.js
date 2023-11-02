const BASE_API_URL = "https://api.moviestar.nomoredomainsrocks.ru";
//const BASE_API_URL = "http://localhost:3000";

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = async ({ name, email, password }) => {
  return fetch(`${BASE_API_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = async ({ email, password }) => {
  return fetch(`${BASE_API_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    localStorage.setItem('userId', data._id)
    return data;
  })
};

export const getContent = async () => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
    }
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = async (data) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};

export const getSavedMovies = async () => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...headers,
    }
  }).then((res) => checkResponse(res));
};

export const saveMovie = async (movie) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co/' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
    }),
  }).then((res) => checkResponse(res));
};

export const deleteMovie = async (id) => {
  return fetch(`${BASE_API_URL}/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...headers,
    },
  }).then((res) => checkResponse(res));
};



