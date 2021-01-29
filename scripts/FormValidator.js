export default class Validation {
    constructor(config, formSelector) {
        this._config = config;
        this._form = document.querySelector(formSelector);
        this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    };

//функция добавления класса ошибки
_showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  };

//функция удаления класса ошибки
_hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputInvalidClass);
  };

//функция проверки валидности полей ввода
_checkInputValidity(input) {
    if(input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  };

//функция переключения состояния кнопки
setButtonState(isActive) {
    if(isActive) {
      this._buttonSubmit.classList.remove(this._config.buttonInvalidClass);
      this._buttonSubmit.disabled = false;
    } else {
      this._buttonSubmit.classList.add(this._config.buttonInvalidClass);
      this._buttonSubmit.disabled = true;
    }
  }

//функция добавления слушателей
_setEventListener() {
        this._form.addEventListener('input', (evt) => {
          const input = evt.target;
          this._checkInputValidity(input);
          this.setButtonState(this._form.checkValidity());
        });
  }

//функция подключения валидации
enableValidation() {
    this._setEventListener();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();            
        // this.setButtonState(this._form.checkValidity());
    });
  }
}