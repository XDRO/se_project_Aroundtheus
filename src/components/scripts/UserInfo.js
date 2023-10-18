export default class UserInfo {
  //render information from the user
  constructor(userNameSelector, aboutSelector) {
    this._nameElement = document.querySelector(userNameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    const userInput = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }
}
