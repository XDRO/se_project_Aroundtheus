export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
    this._popupImage = document.querySelector(".modal__preview-image");
    this._editForm = document.querySelector("#edit-card-form");
    this._editFormButton = document.querySelector("#profile-edit-button");
  }
  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
    this._editForm.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    // close button
    this._popupClose.addEventListener("click", () => {
      this.close();
    });
    // open button for preview image
    this._popupImage.addEventListener("click", () => {
      this.open();
    });
    this._editFormButton.addEventListener("click", () => {
      this.open();
    });
    this._editFormClose;
  }
}
