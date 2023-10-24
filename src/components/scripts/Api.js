export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // methods for working with the API
  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`'Error:' ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.renderResult);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.renderResult);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this.renderResult);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }

  renderError() {}

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.renderResult);
  }

  unlikeCard() {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }

  updateAvater() {}

  editProfile() {}
}
