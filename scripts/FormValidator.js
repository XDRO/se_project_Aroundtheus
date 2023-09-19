export default class FormValidation {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl, errorMessageEl) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formEls, inputEl) {
    const errorMessageEl = formEls.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _hasInvalidInput() {
    return !this._inputElements.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(formEls, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(
        inputEl,
        document.querySelector(`#${inputEl.id}-error`)
      );
    } else {
      this._hideInputError(formEls, inputEl);
    }
  }

  setEventListeners() {
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.setEventListeners();
  }
}
