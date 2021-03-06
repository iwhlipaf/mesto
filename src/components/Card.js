export default class Card {
    constructor({ name, link }, template, openFullscreenImage) {
        this._name = name;
        this._link = link;
        this._showImage = openFullscreenImage;
        this._template = document.querySelector(template);
    }

    //создание шаблона карточки
    _getTemplate() {
        const cardsTemplate = this._template.content.cloneNode(true);
        return cardsTemplate;
    }

    //Добавление слушателй
    _setEventListenrs() {
        this._card.querySelector('.place__like').addEventListener('click', this._likingCard);
        this._card.querySelector('.place__delete-button').addEventListener('click', this._removingCard);
        this._card.querySelector('.place__foto').addEventListener('click', () => {
            this._showImage({ name: this._name, link: this._link });
        });
    }

    //Создание карточки
    generateCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.place__placename').textContent = this._name;
        this._card.querySelector('.place__foto').src = this._link;
        this._card.querySelector('.place__foto').alt = "Фото";
        this._setEventListenrs();
        return this._card;
    }

    //функция лайка карточки
    _likingCard(evt) {
        evt.target.classList.toggle('place__like_liked');
    }

    //функция удаления карточки
    _removingCard(evt) {
        evt.target.closest('.place').remove();
    }
}