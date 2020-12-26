const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = document.querySelector('.popup__button_close_profileform');
const settingProfilePopup = document.querySelector('.popup__profile');
const submitForm = document.querySelector('.inputform__profile');

const nameInput = document.querySelector('.inputform__field_info_name');
const jobInput = document.querySelector('.inputform__field_info_career');

const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');

const addUsersCardButton = document.querySelector('.profile__add-button');
const closeCardPopupButton = document.querySelector('.popup__button_close_cardform');
const settingCardPopup = document.querySelector('.popup__card');
const submitCard = document.querySelector('.inputform__card');

const placeNameInput = document.querySelector('.inputform__field_info_place');
const sourceFotoInput = document.querySelector('.inputform__field_info_source');

const placesContainer = document.querySelector('.elements__places');

const settingImgPopup = document.querySelector('.popup-fullscreen');
const placeFoto = document.querySelector('.popup-fullscreen__img');
const placeName = document.querySelector('.popup-fullscreen__title');
const closeImgPopupButton = document.querySelector('.popup-fullscreen__close-button');


//заполнение из массива
initialCards.forEach(cardInfo => {
  const card = getCard(cardInfo);
  placesContainer.append(card);
});

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
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);    
  };
}

//функция закрытия окна по Overlay
function closePopupByOverlay(evt) {
  if(evt.target.classList.contains('popup_active')) {
    closePopup(evt.target);
  };
}

//функции для окна редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
}

//функции для окна добавления карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  addUsersCard();
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
}

//функция лайка карточки
function likingCard(evt) {
  evt.target.classList.toggle('place__like_liked');
} 

//функция удаления карточки
function removingCard(evt) {
  evt.target.closest('.place').remove();
}

//функция добавления карточки пользователя
function addUsersCard() {
  const cardInfo = { 
    name: placeNameInput.value,
    link: sourceFotoInput.value
 }
  const card = getCard(cardInfo);
  placesContainer.prepend(card);
}

//функция создания карточки
function getCard(placedata) {
  const cardsTemplate = document.querySelector('#card-template').content.cloneNode(true);
  cardsTemplate.querySelector('.place__placename').textContent = placedata.name;
  cardsTemplate.querySelector('.place__foto').src = placedata.link;
  
  const likeCard = cardsTemplate.querySelector('.place__like');
  likeCard.addEventListener('click', likingCard);
  
  const deletCard = cardsTemplate.querySelector('.place__delete-button');
  deletCard.addEventListener('click', removingCard);
  
  const fullscreenImg = cardsTemplate.querySelector('.place__foto');
  fullscreenImg.addEventListener('click', function(evt) {
    const opendImg = evt.target.closest('.place');
    placeFoto.src = opendImg.querySelector('.place__foto').src;
    placeName.textContent = opendImg.querySelector('.place__placename').textContent;
    openPopup(settingImgPopup);
  });
  return cardsTemplate
}

//Функция очистки полей ввода от  ошибок после закрытии окна
function cleanInputError(popup) {
    const errorList = popup.querySelectorAll('.error');
    errorList.forEach( error => {
      error.textContent = "";
    });
    const inputList = popup.querySelectorAll('.inputform__field_state_invalid');
    inputList.forEach( input => {
       input.classList.remove('inputform__field_state_invalid');
    });
}

//Слушатели событий профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  cleanInputError(settingProfilePopup);
  openPopup(settingProfilePopup);
});
closeProfilePopupButton.addEventListener('click', () => {
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
});
submitForm.addEventListener('submit', formSubmitHandler);

//Слушатели событий карточки
addUsersCardButton.addEventListener('click', () => {
  document.querySelector('.inputform__card').reset();
  cleanInputError(settingCardPopup);
  openPopup(settingCardPopup);
});
closeCardPopupButton.addEventListener('click', function() {
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
});
submitCard.addEventListener('submit', cardSubmitHandler);

//Слушатель события картинки
closeImgPopupButton.addEventListener('click', () => {
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
});