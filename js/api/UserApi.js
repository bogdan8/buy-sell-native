class UserApi {
  /* Get all users */
  static async getAllUsers(jwt) {
    let response = await fetch('http://firtkashop.herokuapp.com/users.json', {
      method: 'GET',
      headers: {
        'AUTHORIZATION': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response = JSON.parse(await response.text())

  }

  /* Create user */
  static async createUser(paramsUser) {
    let response = await fetch('http://firtkashop.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: paramsUser
      })
    });
    return response = JSON.parse(await response.text())
  }
}

export default UserApi