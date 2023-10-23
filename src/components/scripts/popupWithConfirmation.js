import Popup from "./Popup";

export default class ConfirmationOnClick extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._deleteConfirmForm = this._popupElement.querySelector(".modal__form");
    this._deleteConfirmSubmit = this._popupElement.querySelector(
      ".modal__button-delete_save"
    );
    this._deleteSubmitConfimText = this._deleteConfirmSubmit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteConfirmForm.addEventListener("submit", (e) => {
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
