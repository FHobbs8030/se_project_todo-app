import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector("form");
  }

  _getInputValues() {
    const inputs = this.form.querySelectorAll("input, textarea");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _submitForm(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this.handleFormSubmit(inputValues);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => this._submitForm(evt));
  }
}

export default PopupWithForm;
