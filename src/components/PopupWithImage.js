import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open(data) {
        const placeFoto = document.querySelector('.popup-fullscreen__img');
        const placeName = document.querySelector('.popup-fullscreen__title');
        placeFoto.src = data.link;
        placeFoto.alt = "Фото";
        placeName.textContent = data.placeName

        super.openPopup()
    }
}