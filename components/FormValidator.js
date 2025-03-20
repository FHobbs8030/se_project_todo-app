export class FormValidator {
  constructor(formElement, config) {
    this.formElement = formElement;
    this.config = config;
    this.inputElements = Array.from(
      formElement.querySelectorAll("input, textarea")
    );
    this.inputElements.forEach((input) => {
      input.addEventListener("input", () => this.validateField(input));
    });
  }

  validate() {
    let valid = true;
    this.inputElements.forEach((input) => {
      if (!this.validateField(input)) {
        valid = false;
      }
    });
    return valid;
  }

  validateField(input) {
    const rules = this.config[input.name] || {};
    const errorElement = document.getElementById(`${input.id}-error`);
    let isValid = true;
    let errorMessage = "";
    const value = input.value.trim();
    if (rules.required && !value) {
      isValid = false;
      errorMessage = rules.requiredMessage || "This field is required.";
    }
    if (isValid && rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage =
        rules.minLengthMessage || `Minimum length is ${rules.minLength}.`;
    }
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage =
        rules.maxLengthMessage || `Maximum length is ${rules.maxLength}.`;
    }
    if (!isValid) {
      this.showError(errorElement, errorMessage);
    } else {
      this.clearError(errorElement);
    }
    return isValid;
  }

  showError(errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("error-visible");
    }
  }

  clearError(errorElement) {
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("error-visible");
    }
  }
}
