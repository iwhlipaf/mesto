export default class UserInfo {
    constructor(profileName, profileCareer) {
        this._profileName = profileName;
        this._profileCareer = profileCareer;
        this._name = '';
        this._career = '';
    }

    //вставка информации в DOM
    updateDOMUserInfo() {
        this._profileName.textContent = this._name;
        this._profileCareer.textContent = this._career;
    }

    //запись информации в экземпляр класса
    setUserInfo(name, career) {
        this._name = name;
        this._career = career;
    }

    //получение информации 
    getUserInfo() {
        return {
            name: this._name,
            career: this._career
        }
    }
}

