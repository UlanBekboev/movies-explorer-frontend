class MainApi {
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
    return this._requestUrl(`${this._baseUrl}/sign-up`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  }

  login({ email, password }) {
    return this._requestUrl(`${this._baseUrl}/sign-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      if (data.token) {
        localStorage.setItem("userId", data._id);
        return data;
      }
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
  baseUrl: "https://api.moviestar.nomoredomainsrocks.ru",
});