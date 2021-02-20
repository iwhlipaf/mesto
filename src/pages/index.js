import { initialCards } from '../components/initialArray.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//конфиг
const validationConfig = {
  inputsSelector: '.inputform__field',
  submitButtonSelector: '.inputform__submitbutton',
  inputInvalidClass: 'inputform__field_state_invalid',
  buttonInvalidClass: 'inputform__submitbutton_state_invalid',
}

//переменные
const editProfileButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const careerName = document.querySelector('.profile__career');
const nameInput = document.querySelector('.inputform__field_info_name');
const jobInput = document.querySelector('.inputform__field_info_career');

const addUsersCardButton = document.querySelector('.profile__add-button');

const submitCard = document.querySelector('.inputform_card');

const placesContainer = document.querySelector('.elements__places');

const validationFormAdd = new FormValidator(validationConfig, '.inputform_card');
const validationFormProfile = new FormValidator(validationConfig, '.inputform_profile');

const cardList = new Section(initialCards, renderCards, '.elements__places');

const userInfo = new UserInfo(profileName, careerName);

//функция отрисовки карточки
function renderCards(data) {
  const newCard = new Card(data, '#card-template', openFullscreenImage);
  cardList.addItem(newCard.generateCard());
}
//запуск отрисовки карточек из массива
cardList.renderItems();

//окно открытия картинки на полный экран
const popupImage = new PopupWithImage('.popup-fullscreen');
popupImage.setEventListeners();

//функция открытия картинки на полный экран
function openFullscreenImage(data) {
  popupImage.openImage(data);
}

//окно формы профиля и обработчик
const popupProfile = new PopupWithForm('.popup_profile', profileSubmitHandler);
popupProfile.setEventListeners();

//функции для кнопки окна редактирования профиля
function profileSubmitHandler(data) {
  userInfo.setUserInfo(data.name, data.career);  
  userInfo.updateDOMUserInfo();
  popupProfile.closeForm();
}

//обработчик событий кнопки редактирования профиля
editProfileButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.career;
  validationFormProfile.cleanInputError();
  validationFormProfile.setButtonState(false);
  popupProfile.open();
});

//окно формы карточки и обработчик
const popupCard = new PopupWithForm('.popup_card', cardSubmitHandler);
popupCard.setEventListeners();

//функции для кнопки окна добавления карточки
function cardSubmitHandler(data) {
  const userCard = new Card(data, '#card-template', openFullscreenImage);
  placesContainer.prepend(userCard.generateCard());
  popupCard.closeForm();
}

//обработчик событий кнопки добавления карточки
addUsersCardButton.addEventListener('click', () => {
  submitCard.reset();
  validationFormAdd.cleanInputError();
  validationFormAdd.setButtonState(false);
  popupCard.open();
});

userInfo.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');
userInfo.updateDOMUserInfo()

//Запуск валидации
validationFormAdd.enableValidation();
validationFormProfile.enableValidation();