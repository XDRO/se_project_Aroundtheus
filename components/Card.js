export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // getElement() {
  //   this._cardElement = document
  //     .querySelector(this._cardSelector)
  //     .content.querySelector(".card")
  //     .cloneNode(true);
  // }

  getView() {
    this._cardElement = this.getElement();
    const cardTitle = this._cardElement.querySelector(
      ".card__description-text"
    );
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

//   getView() {
//     this._cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);
//     // select the image element
//     this._cardImage = this._cardElement.querySelector(".card__image");
//     this._cardImage.src = this._link;
//     this._cardText = this._cardElement.querySelector(".card__description-text");
//     this._cardText.textContent = this._name;
//     this._cardPreviewImage = this._cardElement.querySelector(
//       "#preview-image-modal"
//     );
//     // cardDescriptionTextEl.textContent = ;
//     // add src and alt
//     this._setEventListeners();
//     return this._cardElement;
//   }
// }
