/*console.log('Hello World!');*/

let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let settingPopup = document.querySelector('.popup');
let submitButton = document.querySelector('.input-form');

let nameInput = document.querySelector('.input-form__fieldname')
let jobInput = document.querySelector('.input-form__fieldcareer')

let profileName = document.querySelector('.profile__name')
let profileCareer = document.querySelector('.profile__career')

function setPopup() {
    if (settingPopup.classList.contains('popup')) {
        settingPopup.classList.toggle('popup_active');
        nameInput.value = profileName.textContent;
        jobInput.value = profileCareer.textContent;
    } else {
        settingPopup.classList.toggle('popup_active');
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    setPopup()
}

popupOpenButton.addEventListener('click', setPopup);
popupCloseButton.addEventListener('click', setPopup);
submitButton.addEventListener('submit', formSubmitHandler);

