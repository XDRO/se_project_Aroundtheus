import Popup from "./Popup";

export default class ConfirmationOnClick extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._deleteConfirmForm = document.querySelector(popupSelector);
    console.log(this._deleteConfirmForm);
    this._deleteConfirmPopup = this._popupElement.querySelector(".modal__form");
    console.log(this._deleteConfirmPopup);
    this._deleteConfirmContainer = this._popupElement.querySelector(
      ".modal__delete-container"
    );
    console.log(this._deleteConfirmContainer);
    this._deleteFormCloseButton = this._popupElement.querySelector(
      ".modal__close-button_delete-form"
    );
    console.log(this._deleteFormCloseButton);
    this._deleteConfirmSubmit = this._popupElement.querySelector(
      ".modal__button-delete_save"
    );
    console.log(this._deleteConfirmSubmit);
    this._deleteSubmitConfimText = this._deleteConfirmSubmit.textContent;
  }

  open() {
    this._deleteConfirmForm.addEventListener("click", function () {
      this._deleteConfirmForm.classList.add("modal_opened");
    });
  }

  setEventListeners() {
    this.open();
    super.setEventListeners();
    this._deleteConfirmPopup.addEventListener("submit", (e) => {
      e.preventDefualt();
      this._handleFormSubmit(e);
    });
  }

  deleteing = (deleteing, deleteingText = "Deleteing...") => {
    if (deleteing) {
      this._deleteConfirmSubmit.textContent = deleteingText;
    } else {
      this._deleteConfirmSubmit.textContent = this._deleteSubmitConfimText;
    }
  };

  setSubmitCall(callback) {
    this._handleFormSubmit = callback;
  }
}
