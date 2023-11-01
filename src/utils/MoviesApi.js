class MoviesApi {
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

  getMovies() {
    return this._requestUrl(this._baseUrl, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});