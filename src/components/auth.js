class Auth {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }
    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    }

    registrationUser(res) {
        return fetch(`${this._baseUrl.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                password: res.password,
                email: res.email
            })
        })
        .then(this._handleResponse)
        };

    authorizationUser(res) {
        return fetch(`${this._baseUrl.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                password: res.password,
                email: res.email
            })
        })
        .then(this._handleResponse)
        };    
    
    tokenCheck(res) {
        console.log(res)
        return fetch(`${this._baseUrl.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${res}`
                }
        })
        .then(this._handleResponse)
        };     
    
}
const auth = new Auth({
  baseUrl: 'https://mestobackend-2ad59cc83148.herokuapp.com',
});
export default auth;