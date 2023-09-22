import Card from "./Card.js";
import FormValidation from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";

import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake Lousie",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
    alt: "Lago di Braies",
  },
];

const data = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Elements
const modals = [...document.querySelectorAll(".modal")];
const modalAddSubmitButton = document.querySelector("#modal-submit-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-card-form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const modalInputs = document.querySelectorAll(".modal__input");
const addCardModalTitleInput = document.querySelector(
  "#add-card-modal-title-input"
);
const addCardModalLinkInput = document.querySelector(
  "#add-card-modal-link-input"
);
const cardListEl = document.querySelector(".cards__list");
const profileAddButton = document.querySelector("#profile-add-button");

const cardTemplate = document
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);

// const PopUpWithImage = new PopUpWithImage("#preview-image-modal");
const newFormClose = new PopupWithForm(".modal__close", FormCardClose);
function FormCardClose(popup) {
  newFormClose.close(popup);
}
// popup with form
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);

// functions
function handleCardFormSubmit(data) {
  const cardInput = getCardElement(data);
  cardListEl.prepend(cardInput);
  profileAddForm.reset();
  newCardPopup.close();
  return cardInput;
}

function getCardElement(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }

function openModal(modal) {
  modal.classList.add("modal_opened");
  // document.addEventListener("keydown", closeByEscape);
}

function handleImageClick(data) {
  const previewImage = document.querySelector(".modal__preview-image");
  const previewImageTitle = document.querySelector(
    ".modal__preview-description"
  );
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageTitle.textContent = data.name;
  openModal(previewImageModal);
}

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidation(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidation(validationSettings, profileAddForm);
addFormValidator.enableValidation();

// event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDesciption.textContent = profileDescriptionInput.value;
  closePopup.close(profileEditModal);
}

// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     closePopup.close(openedPopup);
//   }
// }

//event listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDesciption.textContent;
  openModal(profileEditModal);
});

// add new card button
profileAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  openModal(profileAddModal);
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.prepend(cardElement);
});

modals.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      // closePopup(modalContainer);
    }
    if (evt.target.classList.contains("modal__close")) {
      // closePopup(modalContainer);
    }
  });
});
