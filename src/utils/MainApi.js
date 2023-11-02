//const BASE_API_URL = "https://api.moviestar.nomoredomainsrocks.ru";
const BASE_API_URL = "http://localhost:3000";

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



/* class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _requestUrl(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
  }

  register({  name, email, password }) {
    return this._requestUrl(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  }

  login({ email, password }) {
    return this._requestUrl(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((data) => {
        localStorage.setItem("userId", data._id);
        return data;
    });
  }

  getContent() {
    return this._requestUrl(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
      },
    });
  }

  getUserInfo() {
    return this._requestUrl(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
    });
  }

  updateUserInfo({ name, email }) {
    return this._requestUrl(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  getSavedMovies() {
    return this._requestUrl(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  postSavedMovie(data) {
    return this._requestUrl(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: "https://api.nomoreparties.co" + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail:
          "https://api.nomoreparties.co" + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
  }

  deleteSavedMovie(movieId) {
    return this._requestUrl(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const mainApi = new MainApi({
  //baseUrl: "https://api.moviestar.nomoredomainsrocks.ru",
  baseUrl: "http://localhost:3000"
}); */