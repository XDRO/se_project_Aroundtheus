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
      const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.remove(inputErrorClass);
      errorMessageEl.textContent = " ";
      errorMessageEl.classList.remove(errorClass);
    }
  
    _toggleButtonState(inputElm, submitButton, { inactiveButtonClass }) {
      let foundInvalid = false;
      inputElm.forEach((input) => {
        if (!input.validity.valid) {
          foundInvalid = true;
        }
      });
      if (foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
      } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
      }
    }
  
    _checkInputValidity(formEl, inputEl, config) {
      if (!inputEl.validity.valid) {
        this._showInputError(
          inputEl,
          formEl.querySelector(`#${inputEl.id}-error`)
        );
      } else {
        this._hideInputError(formEl, inputEl, config);
      }
    }
  
    setEventListeners(formEl, config) {
      const inputElm = Array.from(formEl.querySelectorAll(this._inputSelector));
      const submitButton = formEl.querySelector(this._submitButtonSelector);
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
  