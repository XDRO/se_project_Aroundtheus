export default class FormValidation {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = formElement;
  }

  _showInputError(inputEl, errorMessageEl) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl, formEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = document.querySelector(".modal__input");
    // inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(errorClass);
  }

  _hasInvaildInput(inputList) {
    return !inputList.every((inputElm) => inputElm.validity.valid);
  }

  _toggleButtonState(inputElm, submitButton, { inactiveButtonClass }) {
    if (hasInvlaidInput(inputElm)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      this._showInputError(
        inputEl,
        document.querySelector(`#${inputEl.id}-error`)
      );
    } else {
      this._hideInputError(formEl, inputEl, config);
    }
  }

  setEventListeners(formEl, config) {
    const inputElm = Array.from(document.querySelectorAll(this._inputSelector));
    const submitButton = document.querySelector(this._submitButtonSelector);
    inputElm.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl, config);
        this._toggleButtonState(inputEl, submitButton, config);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.setEventListeners(this.form, {
      inputErrorClass: this._inputErrorClass,
      errorClass: this._errorClass,
      inactiveButtonClass: this._inactiveButtonClass,
    });
  }
}

