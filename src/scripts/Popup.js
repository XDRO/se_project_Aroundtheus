export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
    console.log(this._popupClose);
  }
  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
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
  }
}
