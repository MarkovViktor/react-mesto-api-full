class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
      })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  getAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
}

export const api = new Api({
  baseUrl: "https://api.project15.students.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});