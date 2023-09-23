import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._editForm = document.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputElements.forEach((inputElements) => {
      inputValues[inputElements.name] = inputElements.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
