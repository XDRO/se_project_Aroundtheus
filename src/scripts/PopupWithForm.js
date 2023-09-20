import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ name, link }, popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._name = name;
    this._link = link;
  }
  open() {
    super.open();
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    this._popupForm
      .querySelector(".modal__button")
      .addEventListener("submit", () => {
        this._handleFormSubmit({ name: this._name, link: this._link });
      });
  }
  setEventListeners() {
    this._popupForm.querySelector("");
  }
}
