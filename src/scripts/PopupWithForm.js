import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  open() {
    super.open();
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    const inputElements = document.querySelectorAll(".modal__input");
    const inputValues = {};
    inputElements.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm
      .querySelector(".modal__button")
      .addEventListener("submit", () => {
        this._handleFormSubmit(inputValues);
      });
  }
}
