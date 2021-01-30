import { initialCards } from './initialArray.js';
import { Card } from './Card.js';
import FormValidator from './FormValidator.js';

//конфиг
const validationConfig = {
  inputsSelector: '.inputform__field',
  submitButtonSelector: '.inputform__submitbutton',
  inputInvalidClass: 'inputform__field_state_invalid',
  buttonInvalidClass: 'inputform__submitbutton_state_invalid',
}

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = document.querySelector('.popup__button_close_profileform');
const settingProfilePopup = document.querySelector('.popup_profile');
const submitForm = document.querySelector('.inputform_profile');

const nameInput = document.querySelector('.inputform__field_info_name');
const jobInput = document.querySelector('.inputform__field_info_career');

const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');

const addUsersCardButton = document.querySelector('.profile__add-button');
const closeCardPopupButton = document.querySelector('.popup__button_close_cardform');
const settingCardPopup = document.querySelector('.popup_card');
const submitCard = document.querySelector('.inputform_card');

const placeNameInput = document.querySelector('.inputform__field_info_place');
const sourceFotoInput = document.querySelector('.inputform__field_info_source');

const placesContainer = document.querySelector('.elements__places');

const settingImgPopup = document.querySelector('.popup-fullscreen');
const placeFoto = document.querySelector('.popup-fullscreen__img');
const placeName = document.querySelector('.popup-fullscreen__title');
const closeImgPopupButton = document.querySelector('.popup-fullscreen__close-button');

const validationFormAdd = new FormValidator(validationConfig, '.inputform_card');
const validationFormProfile = new FormValidator(validationConfig, '.inputform_profile');

//функция открытия окна
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByOverlay);
}

//функция закрытия окна
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupByOverlay);
}

//функция закрытия окна по Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  };
}

//функция закрытия окна по Overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_active')) {
    closePopup(evt.target);
  };
}

//функции для окна редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  closePopup(settingProfilePopup);
}

//функции для окна добавления карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  addUsersCard();
  closePopup(settingCardPopup);
}

//функция добавления карточки пользователя
function addUsersCard() {
  const cardInfo = {
    name: placeNameInput.value,
    link: sourceFotoInput.value
  }
  const card = new Card(cardInfo, openFullscreenImage);
  placesContainer.prepend(card.renderCard());
}

//функция открытия карточки на полный экран
function openFullscreenImage(data) {
  placeFoto.src = data.link;
  placeName.textContent = data.name;
  openPopup(settingImgPopup);
}

//Слушатели событий профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  validationFormProfile.cleanInputError();
  openPopup(settingProfilePopup);
});
closeProfilePopupButton.addEventListener('click', () => {
  closePopup(settingProfilePopup);
});
submitForm.addEventListener('submit', formSubmitHandler);

// Слушатели событий карточки
addUsersCardButton.addEventListener('click', () => {
  submitCard.reset();
  validationFormAdd.cleanInputError();
  validationFormAdd.setButtonState(false);
  openPopup(settingCardPopup);
});
closeCardPopupButton.addEventListener('click', function () {
  closePopup(settingCardPopup);
});
submitCard.addEventListener('submit', cardSubmitHandler);

//Слушатель события картинки
closeImgPopupButton.addEventListener('click', () => {
  closePopup(settingImgPopup);
});

//заполнение из массива
initialCards.forEach(cardInfo => {
  const card = new Card(cardInfo, openFullscreenImage);
  placesContainer.append(card.renderCard());
});

//Запуск валидации
validationFormAdd.enableValidation();
validationFormProfile.enableValidation();