console.log('Hello World!');

let popupOpenButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let settingPopup = document.querySelector('.popup');
let submitButton = document.querySelector('.input-form__submitbutton');

let setDefaultName = document.querySelector('.popup__defaulttext_name')
let setDefaultCareer = document.querySelector('.popup__defaulttext_career')

let nameInput = document.querySelector('.input-form__field1')
let jobInput = document.querySelector('.input-form__field2')

let addNewName = document.querySelector('.profile__name')
let addNewCareer = document.querySelector('.profile__career')

function setPopup() {
    settingPopup.classList.toggle('popup_active');
    nameInput.value = setDefaultName.textContent;
    jobInput.value = setDefaultCareer.textContent;
}

popupOpenButton.addEventListener('click', setPopup);
popupCloseButton.addEventListener('click', setPopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    addNewName.textContent = nameInput.value;
    addNewCareer.textContent = jobInput.value;
    setPopup()
}

submitButton.addEventListener('click', formSubmitHandler);

