// enabling validation by calling enableValidation()
// pass all the settings on call

// const profileNameInput = document.querySelector(".profile__title");
// const profilePlaceInput = document.querySelector(".profile__description");

function showInputError(
  formEls,
  inputEl,
  titleEls,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formEls.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  titleEls.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(
  formEls,
  inputEl,
  titleEls,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formEls.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  titleEls.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(formEl, inputEl, titleEls, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, titleEls, options);
  }

  hideInputError(formEl, inputEl, titleEls, options);
}

function hasInvlaidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(
  inputEls,
  titleInputEls,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvlaidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    titleInputEls.classList.add(inactiveButtonClass);
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
  titleInputEls.classList.remove(inactiveButtonClass);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  const titleInputEls = [...titleEls.querySelector(inputSelector)];

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, titleEls, options);
      toggleButtonState(inputEls, submitButton, titleInputEls, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  const titleEls = [...document.querySelectorAll(options.profileNameInput)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options, titleEls);
    // look for all inputs instde of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // grab the validation message
    // add error class to input
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  profileNameInput: ".profile__title",
  profilePlaceInput: ".profile__description",
};

enableValidation(config);
