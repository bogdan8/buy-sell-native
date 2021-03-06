class UserApi {
  /* Get all users */
  static async getAllUsers(jwt) {
    let response = await fetch('http://18.191.64.11/users.json', {
      method: 'GET',
      headers: {
        'AUTHORIZATION': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response = await response.text();
  }

  /* Create user */
  static async createUser(paramsUser) {
    let formData = new FormData();
    formData.append('user[username]', paramsUser.username);
    formData.append('user[email]', paramsUser.email);
    formData.append('user[password]', paramsUser.password);
    formData.append('user[location]', paramsUser.location);
    formData.append('user[telephone]', paramsUser.telephone);
    if (paramsUser.avatar.fileName) { // check if upload avatar
      formData.append('user[avatar]', {
        uri: paramsUser.avatar.uri,
        type: paramsUser.avatar.type,
        name: paramsUser.avatar.fileName,
      });
    }
    let response = await fetch('http://18.191.64.11/users.json', {
      method: 'POST',
      body: formData
    });

    return response = await response.json();
  }
}

export default UserApi;
