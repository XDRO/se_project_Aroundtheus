export default class Card {
    constructor({ name, link }, cardSelector) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
    }
  
    _setEventListeners() {
      // card like button
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleLikeIcon();
        });
  
      // delete button
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCard();
        });
    }
  
    _handleDeleteCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    _handleLikeIcon() {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  
    getView() {
      this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
  
      // get the card view
      // set event listeners
      this._setEventListeners();
      //return card
    }
  }
  