//функция добавления класса ошибки
function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
};

//функция удаления класса ошибки
function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.inputInvalidClass);
};

//функция проверки валидности полей ввода
function checkInputValidity(form, input, config) {
    if(input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
};

//функция переключения состояния кнопки
function setButtonState(button, isActive, config) {
        if(isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true;
    }
}

//функция добавления слушателей
function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputsSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach( input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

//функция подключения валидации
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach( form => {
        setEventListener(form, config);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();            
        });

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}

//конфиг
const validationConfig = {
    formSelector: '.inputform',
    inputsSelector: '.inputform__field',
    submitButtonSelector: '.inputform__submitbutton',
    inputInvalidClass: 'inputform__field_state_invalid',
    buttonInvalidClass: 'inputform__submitbutton_state_invalid',
}

enableValidation(validationConfig);