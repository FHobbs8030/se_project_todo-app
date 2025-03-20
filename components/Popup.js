class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    if (!this.popup) {
      throw new Error("Popup not found");
    }
    this.closeButton = this.popup.querySelector(".popup__close");
    this.overlay = this.popup.querySelector(".popup__overlay");
  }

  open() {
    this.popup.classList.add("popup_opened");
  }

  close() {
    this.popup.classList.remove("popup_opened");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
  }
}

export default Popup;
