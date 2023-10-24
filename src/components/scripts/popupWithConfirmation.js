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
      e.preventDefault();
      this._handleFormSubmit(e);
    });
  }

  deleting = (deleting, deletingText = "Deleting...") => {
    if (deleting) {
      this._deleteConfirmSubmit.textContent = deletingText;
    } else {
      this._deleteConfirmSubmit.textContent = this._deleteSubmitConfimText;
    }
  };

  setSubmitCall(callback) {
    this._handleFormSubmit = callback;
  }
}
