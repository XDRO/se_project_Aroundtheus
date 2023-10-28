import Card from "../components/scripts/Card.js";
import FormValidation from "../components/scripts/FormValidator.js";
import PopupWithForm from "../components/scripts/PopupWithForm.js";
import PopupWithImage from "../components/scripts/PopupWithImage.js";
import UserInfo from "../components/scripts/UserInfo.js";
import Section from "../components/scripts/Section.js";
import * as DOM from "../utils/constants.js";
import { validationSettings } from "../utils/utils.js";
import Api from "../components/scripts/Api.js";
import PopupWithConfirmation from "../components/scripts/PopupWithConfirmation.js";
import "../pages/index.css";

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d081ca18-dd96-4ff1-863a-c195fbcda74a",
    "Content-Type": "application/json",
  },
});

const userInformation = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__pic"
);

const formValidators = {};
const enableValidation = (validationSettings) => {
  DOM.forms.forEach((formElement) => {
    const validator = new FormValidation(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

let section;

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

    userInformation.setUserInfo(formData);
    userInformation.setAvatar(formData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

function handleDeleteCardClick(item) {
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitCall(() => {
    popupWithConfirmation.deleting(true);
    api
      .deleteCard(item.getId())
      .then(() => {
        item.handleDeleteCard();
        popupWithConfirmation.deleting(false);
      })
      .then(popupWithConfirmation.close())
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(
        document.getElementById("default-confirmation-button-text").textContent
      );
  });
}

function handleImageLike(item) {
  const newLikeStatus = !item.isLiked;
  if (newLikeStatus) {
    api
      .likeCard(item.getId())
      .then((respond) => {
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  } else {
    api
      .unlikeCard(item.getId())
      .then((respond) => {
        item.setLikeStatus(respond.isLiked);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
}

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: "#modal-delete-confirmation",
});
popupWithConfirmation.setEventListeners();

// popup with form
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardAddFormSubmit
);
newCardPopup.setEventListeners();

// edit popup form

const popupEditForm = new PopupWithForm(
  "#profile-edit-modal",
  ({ name, about }) => {
    popupEditForm.saving(true);
    return api
      .editProfile({ name, about })
      .then((editProfile) => {
        popupEditForm.saving(false);
        userInformation.setUserInfo(editProfile);
      })
      .then(popupEditForm.close())
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(
        document.getElementById("default-avatar-button-text").textContent
      );
  }
);
popupEditForm.setEventListeners();

// popup with image
const popupImage = new PopupWithImage("#preview-image-modal");
popupImage.setEventListeners();
function handleImageClick(data) {
  popupImage.open(data);
}
// functions

function createCard(item, _id) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCardClick,
    handleImageLike
  );
  return cardElement.getView();
}

function handleCardAddFormSubmit(data) {
  newCardPopup.saving(true);
  api
    .postNewCard(data)
    .then((card) => {
      newCardPopup.saving(false);
      const cardInput = createCard(card);
      section.addItem(cardInput);
    })
    .then(newCardPopup.close())
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(
      document.getElementById("default-addCard-button-text").textContent
    );
}

//event listeners
DOM.profileEditButton.addEventListener("click", () => {
  const formData = userInformation.getUserInfo();
  popupEditForm.setInputValues(formData);
  popupEditForm.open();
});

// add new card button
DOM.profileAddButton.addEventListener("click", () => {
  formValidators["add-card-form"].toggleButtonState();
  newCardPopup.open();
});

// avatar image update button
const popupAvatar = new PopupWithForm("#update-avatar-modal", (formData) => {
  popupAvatar.saving(true);
  const avatar = formData.avatar;
  return api
    .updateAvatar(avatar)
    .then((updateAvatar) => {
      popupAvatar.saving(false);
      userInformation.setAvatar(updateAvatar.avatar);
    })
    .then(popupAvatar.close())
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(document.getElementById("default-avatar-button-text").textContent);
});
popupAvatar.setEventListeners();

DOM.avatarImgButton.addEventListener("click", () => {
  formValidators["modal-avatar-form"].toggleButtonState();
  popupAvatar.open();
});
