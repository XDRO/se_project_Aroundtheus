import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("#profile-add-modal");
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
      inputValues[inputElement.title] = inputElement.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
