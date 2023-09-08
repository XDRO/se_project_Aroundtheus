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

// Elements
const modalClass = [...document.querySelectorAll(".modal")];
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileAddCloseButton = profileAddModal.querySelector(".modal__close");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseModal = previewImageModal.querySelector(
  "#preview-image-close-modal"
);
const previewImageCard = document.querySelector(".modal__preview-image");
const previewImageDescription = document.querySelector(
  ".modal__preview-description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-card-form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const addCardModalTitleInput = document.querySelector(
  "#add-card-modal-title-input"
);
const addCardModalLinkInput = document.querySelector(
  "#add-card-modal-link-input"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddButton = document.querySelector("#profile-add-button");

// functions

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDescriptionTextEl = cardElement.querySelector(
    ".card__description-text"
  );
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button");
  });
  cardImageEl.addEventListener("click", () => {
    previewImageCard.src = cardData.link;
    previewImageCard.alt = cardData.alt;
    previewImageDescription.textContent = cardData.name;
    openModal(previewImageModal);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.alt;
  cardDescriptionTextEl.textContent = cardData.name;

  return cardElement;
}

// event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDesciption.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addCardModalTitleInput.value,
    link: addCardModalLinkInput.value,
  };
  const card = getCardElement(cardData);
  cardListEl.prepend(card);
  closePopup(profileAddModal);
  profileAddForm.reset();
}

//event listeners
profileEditButton.addEventListener("click", () => {
  toggleButtonState(
    [profileTitleInput, profileDescriptionInput],
    profileEditForm,
    config
  );
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDesciption.textContent;
  openModal(profileEditModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
  }
});

// add new card button
profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddCloseButton.addEventListener("click", () => {
  closePopup(profileAddModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

previewImageCloseModal.addEventListener("click", () => {
  closePopup(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

modalClass.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modalContainer);
    }
    if (evt.target.classList.contains("modal__close")) {
      openModal(modalContainer);
    }
  });
});
