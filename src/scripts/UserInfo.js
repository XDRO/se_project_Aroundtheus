export default class UserInfo {
  //repsonsible for rendering information from the user
  constructor(userNameSelector, jobNameSelector) {
    //object with selectors of two elements
    this._nameElement = document.querySelector(userNameSelector);
    this._descriptionElement = document.querySelector(jobNameSelector);
  }
  getUserInfo() {
    const userInput = {
      title: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
    return userInput;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.job;
  }
}
