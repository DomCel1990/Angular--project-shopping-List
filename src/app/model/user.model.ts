export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    // raccolta cioe come se fosse una proprietà con dentro una funzione ci si accede come si accede
    // ad email per esempio
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token
    }
}

