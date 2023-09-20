export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    //opens popup
    this._popupElement.classList.add(".modal_opened");
    this._popupElement
      .querySelector("#preview-image-modal")
      .classList.add(".modal_opened");
  }
  close() {
    // closes popup
    this._popupElement.classList.remove(".modal_opened");
  }
  _handleEscClose() {
    // listens for esc button
    if (EventTarget.key === "Escape") {
      this._popupElement.querySelector(".modal_opened");
      this.close(this._popupElement);
    }
  }
  setEventListeners() {
    // Add form open button
    this._popupElement
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
        this.open();
      });
    // edit form open button
    this._popupElement
      .querySelector(".profile__edit-button")
      .addEventListener("click", () => {
        this.open();
      });
    // close button
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
