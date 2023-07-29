class Api {
    constructor(baseUrl,headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
    }
    getUserInformation(jwt) {
      return fetch(`${this._baseUrl.baseUrl}/users/me`, {    
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
        .then(res => this._handleResponse(res))
    }
    getCardsFromServer(jwt) {
      return fetch(`${this._baseUrl.baseUrl}/cards`, {  
        method: 'GET',
          headers: {
            authorization: `Bearer ${jwt}`
          }
        })
        .then(res => this._handleResponse(res))
    }
    pathEditProfile(info,jwt) {
      return fetch(`${this._baseUrl.baseUrl}/users/me`, {
        method: 'PATCH',
          headers: {
            authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: info.name,
            about: info.subname})
          })
          .then(res => 
            this._handleResponse(res)
          )
    }
    postCard({name, link}, jwt) {
      return fetch(`${this._baseUrl.baseUrl}/cards`, {
        method: 'POST',
          headers: {
            authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            link: link
          })
      })
      .then(res => res.json());  
    }
    delCardFromServer(id,jwt) {
      return fetch(`${this._baseUrl.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());
    }

    changeLikeCardStatus(id, isLiked, jwt) {
      if(isLiked) {
        return this.likeCard(id,jwt);
      }
      else {
        return this.unlikeCard(id,jwt);
      }
    }

    likeCard(cardId) {
      const jwt = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._handleResponse(res));
    }
    unlikeCard(cardId) {
      const jwt = localStorage.getItem("jwt");
      return fetch(`${this._baseUrl.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._handleResponse(res));
    }
    patchAvatar(data,jwt) {
      return fetch(`${this._baseUrl.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: data.avatar})
      })
      .then(res => this._handleResponse(res));
    }
}
const api = new Api({
  baseUrl: 'https://mestobackend-2ad59cc83148.herokuapp.com',
});
export default api;