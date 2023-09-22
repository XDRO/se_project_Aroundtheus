import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._popupImageDescription = this._popupElement.querySelector(
      ".modal__preview-description"
    );
  }
  setEventListeners() {
    super.setEventListeners();
  }
  open(data) {
    super.open();
    if (data) {
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
      this._popupImageDescription.textContent = data.name;
    }
  }
  close() {
    super.close();
  }
}
