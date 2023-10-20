import Popup from "./Popup";

export default class ConfirmationOnClick extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._deleteConfirmPopup = this._popupElement.querySelector(".modal__form");
    this._deleteConfirmForm = document.querySelector(
      "#modal-delete-confirmation"
    );
    this._deleteFormCloseButton = this._popupElement.querySelector(
      ".modal__close-button_delete-form"
    );
    this._deleteConfirmSubmit = this._popupElement.querySelector(
      ".modal__button-delete_save"
    );
    this._deleteSubmitConfimText = this._deleteConfirmSubmit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteConfirmPopup.addEventListeners("submit", (e) => {
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
