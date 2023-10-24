export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCardClick,
    handleImageLike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleImageLike = handleImageLike;
  }
  _setEventListeners() {
    //".card__like-button"
    // this._cardElement
    //   .querySelector(".card__like-button")
    //   .addEventListener("click", () => {
    //     this._handleLikeIcon();
    //   });
    this._likeButton.addEventListener("click", () => {
      this._handleImageLike(this);
    });
    // refactoring currently ^^^^^^

    //".card__delete-button";
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCardClick(this));

    //".card__image"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  setLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
      console.log("like removed from set like status");
    }
  }

  // _handleLikeIcon() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }
  // refactoring currently ^^^^^^

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    const cardTitle = this._cardElement.querySelector(
      ".card__description-text"
    );
    const cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  getId() {
    return this._id;
  }
}
