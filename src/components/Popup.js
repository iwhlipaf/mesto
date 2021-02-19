export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__button');
    }

    //функция открытия окна
    openPopup() {
        this._popup.classList.add('popup_active');
        this._setEventListeners()
        this._handleEscClose();
    }

    //функция закрытия окна
    closePopup() {
        this._popup.classList.remove('popup_active');
        this._unhandleEscClose();
    }

    //функция закрытия окна по Esc
    _closePopupByEsc = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        };
    }

    //функция закрытия окна по Overlay
    _closePopupByOverlay = (evt) => {
        if (evt.target.classList.contains('popup_active')) {
            this.closePopup();
        };
    }

    //функция добавления слушателя на кнопу Х
    _setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.closePopup();
        });
    }

    //функция добавления слушателей по Esc и Overlay
    _handleEscClose() {
        document.addEventListener('keydown', this._closePopupByEsc);
        document.addEventListener('click', this._closePopupByOverlay);
    }

    //функция удаления слушателей по Esc и Overlay
    _unhandleEscClose() {
        document.removeEventListener('keydown', this._closePopupByEsc);
        document.removeEventListener('click', this._closePopupByOverlay);
    }
}