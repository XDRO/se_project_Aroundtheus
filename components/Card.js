export default class Card {
  constructor({ name, link }, cardSelector, _handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _setEventListeners() {
    //".card__like-button"
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    const deleteButton = this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    //".card__image"
    // this._cardElement
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => {
    //     this._handleImageClick({ name: this._name, link: this._link });
    //   });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // select the image element
    this._cardElement.querySelector(".card__image");
    cardImage.src = this._name;
    cardImage.alt = this._link;
    // cardDescriptionTextEl.textContent = ;
    // add src and alt
    this._setEventListeners();
    return this._cardElement;
  }
}
