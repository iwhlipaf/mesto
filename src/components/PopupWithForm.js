import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        //псевдомассив всех полей ввода
        this._inputList = this._popup.querySelectorAll('.inputform__field');

        //создание объекта для данных
        this._formValues = {};

        //заполнение объекта данными полей ввода
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    //функция добавления слушателей на кнопки
    setEventListeners() {
        super.setEventListener(); 
        this._form = this._popup.querySelector('.inputform'); 
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._submitHandler(this._getInputValues());
        });
    }

    closeForm() {
        this._form.reset();
        super.close();
    }

}