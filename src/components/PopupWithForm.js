import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.inputform');
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

    closeForm() {
        this._form.reset();
        super.close();
    }

}