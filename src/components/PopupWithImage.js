import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._placeFoto = this._popup.querySelector('.popup-fullscreen__img');
        this._placeName = this._popup.querySelector('.popup-fullscreen__title');
    }
    
    openImage(data) {
        this._placeFoto.src = data.link;
        this._placeFoto.alt = "Фото";
        this._placeName.textContent = data.placeName;

        super.open();
    }
}