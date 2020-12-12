const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = document.querySelector('.popup-profile__close-button');
const settingProfilePopup = document.querySelector('.popup-profile');
const submitForm = document.querySelector('.input-form');

const nameInput = document.querySelector('.input-form__field_info_name');
const jobInput = document.querySelector('.input-form__field_info_career');

const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');

const addUsersCardButton = document.querySelector('.profile__add-button');
const closeCardPopupButton = document.querySelector('.popup-card__close-button');
const settingCardPopup = document.querySelector('.popup-card');
const submitCard = document.querySelector('.input-card');

const placeNameInput = document.querySelector('.input-card__field_info_place');
const sourceFotoInput = document.querySelector('.input-card__field_info_source');

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
  }

//функция закрытия окна
function closePopup(evt) {
  evt.target.closest('.popup_active').classList.remove('popup_active');
  }

//функции для окна редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    closePopup(evt);
}

//функции для окна добавления карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  addUsersCard();
  closePopup(evt);
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

//Слушатели событий профиля
editProfileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  openPopup(settingProfilePopup);
});
closeProfilePopupButton.addEventListener('click', closePopup);
submitForm.addEventListener('submit', formSubmitHandler);

//Слушатели событий карточки
addUsersCardButton.addEventListener('click', function() {
  document.querySelector('.input-card').reset();
  openPopup(settingCardPopup);
});
closeCardPopupButton.addEventListener('click', closePopup);
submitCard.addEventListener('submit', cardSubmitHandler);

//Слушатель события картинки
closeImgPopupButton.addEventListener('click', closePopup);