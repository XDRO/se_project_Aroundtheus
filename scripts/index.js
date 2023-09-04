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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-close-modal"
);
const profileAddCloseButton = profileAddModal.querySelector(
  "#profile-close-modal"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseModal = previewImageModal.querySelector(
  "#preview-image-close-modal"
);

const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-card-form");

const profileAddForm = profileAddModal.querySelector("#add-card-form");
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
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  profileAddModal.classList.remove("modal_opened");
  previewImageModal.classList.remove("modal_opened");
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
  // find trash button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button");
  });
  // add event listener to the trash button
  // cardElement.remove();
  cardImageEl.addEventListener("click", () => {
    const previewImageCard = document.querySelector(".preview__image-card");
    previewImageCard.src = cardData.link;
    previewImageCard.alt = cardData.alt;
    previewImageModal.classList.add("modal_opened");
  });

  // add click listener to cardImage element
  // openModal with the previewImageModal

  // make modals open smoothly use visibility hidden
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
  closePopup();
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addCardModalTitleInput.value,
    link: addCardModalLinkInput.value,
  };
  const card = getCardElement(cardData);
  cardListEl.prepend(card);
  closePopup();
}

//event listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDesciption.textContent;
  profileEditModal.classList.add("modal_opened");
});

// add new card button
profileAddButton.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});

profileAddCloseButton.addEventListener("click", () => {
  profileAddModal.classList.remove("modal_opened");
});

profileEditCloseButton.addEventListener("click", closePopup);
profileAddCloseButton.addEventListener("click", closePopup);
previewImageCloseModal.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
