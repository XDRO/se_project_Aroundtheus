import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupFormText = this._popupElement.querySelector(
      ".modal__button-text"
    );
    this._saveSubmitText = this._popupFormText.textContent;
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
  setInputValues(data) {
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.Saving(true);
    this._handleFormSubmit(inputValue)
      .then(() => {
        this.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.Saving(false));
  }

  Saving = (saving, savingText = "Saving...") => {
    if (saving) {
      this._popupFormText.textContent = savingText;
    } else {
      this._popupFormText.textContent = this._saveSubmitText;
    }
  };

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setSubmitCall(callback) {
    this._handleFormSubmit = callback;
  }
}
