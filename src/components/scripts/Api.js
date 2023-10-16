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

  getUserInfo() {}

  postNewCards() {}

  renderError() {}

  editProfile() {}

  deleteCard() {}

  likeCard() {}

  unlikeCard() {}

  updateAvater() {}
}
