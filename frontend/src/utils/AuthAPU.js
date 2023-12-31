class AuthApi {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  register({email, password}) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({email, password})
    })
    .then((res) => this._checkResponse(res))
  }

  authorize({email, password}) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({email, password})
    })
    .then((res) => this._checkResponse(res))
    .then((data) => {
      localStorage.setItem('jwt', 'jwt in cookie')
    return data
    })
  }

  tokenCheck() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => this._checkResponse(res))
  }

  logout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://api.dorozha.mesto.nomoredomainsrocks.ru',
  headers: {
    "Content-Type": "application/json"
  }
});


export default authApi
