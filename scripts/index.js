/*console.log('Hello World!');*/

let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let settingPopup = document.querySelector('.popup');
let submitForm = document.querySelector('.input-form');

let nameInput = document.querySelector('.input-form__field_name')
let jobInput = document.querySelector('.input-form__field_career')

let profileName = document.querySelector('.profile__name')
let profileCareer = document.querySelector('.profile__career')

function setPopup() {
    settingPopup.classList.toggle('popup_active');
    if (settingPopup.classList.contains('popup_active')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileCareer.textContent;
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
submitForm.addEventListener('submit', formSubmitHandler);

