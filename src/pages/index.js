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
import ConfirmationOnClick from "../components/scripts/popupWithConfirmation";
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
          const cardElement = createCard(item);
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

function handleDeleteCardClick(item) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitCall(() => {
    popupWithConfirmation.deleteing(true);
    api
      .deleteCard(item.getId())
      .then(() => {
        item.handleDeleteCard();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    popupWithConfirmation.close();
    // popupWithConfirmation.reset();
  });
}

const popupWithConfirmation = new ConfirmationOnClick({
  popupSelector: "#modal-delete-confirmation",
});
popupWithConfirmation.setEventListeners();

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

function handleImageClick(data) {
  const popupImage = new PopupWithImage("#preview-image-modal");
  popupImage.setEventListeners();
  popupImage.open(data);
}
// functions

function createCard(item, _id) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCardClick
  );
  return cardElement.getView();
}

function handleCardFormSubmit(data) {
  api.postNewCard(data).then((card) => {
    const cardInput = createCard(card);
    section.addItem(cardInput);
    newCardPopup.close();
  });
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
