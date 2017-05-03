class UserApi {
  /* Get all users */
  static async getAllUsers(jwt) {
    let response = await fetch('http://fshop.ustk.in.ua/users.json', {
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
    let formData = new FormData();
    let avatar = {
     uri: paramsUser.avatar.uri,
     type: paramsUser.avatar.type,
     name: paramsUser.avatar.fileName,
   }
   formData.append('user[username]', paramsUser.username);
   formData.append('user[email]', paramsUser.email);
   formData.append('user[password]', paramsUser.passwrod);
   formData.append('user[location]', paramsUser.location);
   formData.append('user[telephone]', paramsUser.telephone);
   formData.append('user[avatar]', avatar);
   let xhr = new XMLHttpRequest();
   xhr.open('POST', 'http://fshop.ustk.in.ua/users.json');
   xhr.send(formData);
 }
}

export default UserApi