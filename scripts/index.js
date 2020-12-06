let editProfileButton = document.querySelector('.profile__edit-button');
let closeProfilePopupButton = document.querySelector('.popup-profile__close-button');
let settingProfilePopup = document.querySelector('.popup-profile');
let submitForm = document.querySelector('.input-form');

let nameInput = document.querySelector('.input-form__field_info_name');
let jobInput = document.querySelector('.input-form__field_info_career');

let profileName = document.querySelector('.profile__name');
let profileCareer = document.querySelector('.profile__career');

let addUsersCardButton = document.querySelector('.profile__add-button');
let closeCardPopupButton = document.querySelector('.popup-card__close-button');
let settingCardPopup = document.querySelector('.popup-card');
let submitCard = document.querySelector('.input-card');

let placeNameInput = document.querySelector('.input-card__field_info_place');
let sourceFotoInput = document.querySelector('.input-card__field_info_source');

const placesContainer = document.querySelector('.elements__places');

let settingImgPopup = document.querySelector('.popup-fullscreen');
let placeFoto = document.querySelector('.popup-fullscreen__img');
let placeName = document.querySelector('.popup-fullscreen__title');
let closeImgPopupButton = document.querySelector('.popup-fullscreen__close-button');


//функции открытия-закрытия окна редактирования профиля
function editProfilePopup() {
    if (!settingProfilePopup.classList.contains('popup-profile_active')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileCareer.textContent;
    }
    settingProfilePopup.classList.toggle('popup-profile_active');
}

//функции для окна редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    editProfilePopup();
}

//функции открытия-закрытия окна добавления карточки
function addCardPopup() {
    if (!settingCardPopup.classList.contains('popup-card_active')) {
      placeNameInput.value = '';
      sourceFotoInput.value = '';
    }
  settingCardPopup.classList.toggle('popup-card_active');
}

//функции для окна добавления карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  addUsersCard();
  addCardPopup();
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
  fullscreenImg.addEventListener('click', openingImg);

  return cardsTemplate
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

//функция лайка карточки
function likingCard(evt) {
  evt.target.classList.toggle('place__like_liked');
} 

//функция удаления карточки
function removingCard(evt) {
  const trashCard = evt.target.closest('.place');
  trashCard.remove();
}

//заполнение из массива
initialCards.forEach(cardInfo => {
  const card = getCard(cardInfo);
  placesContainer.append(card);
});

//функция открытия-закрытия картинки
function openingImg(evt) {
  if (!settingImgPopup.classList.contains('popup-fullscreen_active')) {
      const opendImg = evt.target.closest('.place');
      placeFoto.src = opendImg.querySelector('.place__foto').src;
      placeName.textContent = opendImg.querySelector('.place__placename').textContent;
  }
  settingImgPopup.classList.toggle('popup-fullscreen_active');
}

//Слушатели событий профиля
editProfileButton.addEventListener('click', editProfilePopup);
closeProfilePopupButton.addEventListener('click', editProfilePopup);
submitForm.addEventListener('submit', formSubmitHandler);

//Слушатели событий карточки
addUsersCardButton.addEventListener('click', addCardPopup);
closeCardPopupButton.addEventListener('click', addCardPopup);
submitCard.addEventListener('submit', cardSubmitHandler);

//Слушателm события картинки
closeImgPopupButton.addEventListener('click', openingImg);