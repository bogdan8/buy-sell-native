class SessionApi {
  static async login(credentials) {
    let response = await fetch('http://fshop.ustk.in.ua/user_token.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth: credentials
      })
    });

    let res = await response;
    return response = res.status != 404 ? await response.json() : res;
  }
}

export default SessionApi;