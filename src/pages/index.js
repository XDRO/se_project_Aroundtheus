import Card from "../components/scripts/Card.js";
import FormValidation from "../components/scripts/FormValidator.js";
import PopupWithForm from "../components/scripts/PopupWithForm.js";
import PopupWithImage from "../components/scripts/PopupWithImage.js";
import UserInfo from "../components/scripts/UserInfo.js";
import Section from "../components/scripts/Section.js";
import * as DOM from "../utils/constants.js";
import { validationSettings } from "../utils/utils.js";
import { initialCards } from "../utils/utils.js";
import Api from "../components/scripts/Api.js";
import "../pages/index.css";

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d081ca18-dd96-4ff1-863a-c195fbcda74a",
    "Content-Type": "application/json",
  },
});

let section = 0;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, formData]) => {
    section = new Section(
      {
        items: cardData,
        renderer: (item) => {
          const cardElement = postNewCard(item);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();

    userInfo.setUserInfo(formData);
    // userInfo.setAvatar(formData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

function postNewCard({ name, link, likeCard, _id }) {
  return new Card(
    { name, link, likeCard, _id },
    "#card-template",
    handleImageClick
    // handleTrashButtonClick,
    // handleHeartButton
  ).getView();
}

// popup with form
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
newCardPopup.setEventListeners();

// edit popup form
const userInfo = new UserInfo(".profile__title", ".profile__description");
const popupEditForm = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo(formData);
  popupEditForm.close();
});
popupEditForm.setEventListeners();

// popup with image
const popupImage = new PopupWithImage("#preview-image-modal");
popupImage.setEventListeners();

// functions

function handleCardFormSubmit(data) {
  const cardInput = postNewCard(data);
  section.addItem(cardInput);
  newCardPopup.close();
}

function handleImageClick(data) {
  popupImage.open(data);
}

const editFormValidator = new FormValidation(
  validationSettings,
  DOM.profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidation(
  validationSettings,
  DOM.profileAddForm
);
addFormValidator.enableValidation();

//event listeners
DOM.profileEditButton.addEventListener("click", () => {
  const formData = userInfo.getUserInfo();
  popupEditForm.setInputValues(formData);
  popupEditForm.open();
});

// add new card button
DOM.profileAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

// section
// function createCar(item) {
//   const cardElement = new Card(item, "#card-template", handleImageClick);
//   return cardElement.getView();
// }

// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const cardElement = createCar(item);
//       section.addItem(cardElement);
//     },
//   },
//   ".cards__list"
// );
// section.renderItems();
