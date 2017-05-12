import {Actions} from 'react-native-router-flux';
import * as types from './types';
import userApi from '../api/UserApi';
import {showToast} from '../helpers/helpers';

/* Get all users */
export function allUsers(jwt) {
  return function (dispatch) {
    return userApi.getAllUsers(jwt).then(response => {
      dispatch({
        type: types.GET_ALL_USERS,
        users: response.body
      });
    }).catch(error => {
      throw(error);
    });
  };
}

/* Registration user */
export function addUser(paramsUser) {
  return (dispatch) => {
    return userApi.createUser(paramsUser).then(response => {
      if (response.message.type == 'success') {
        Actions.signin();
      }
      showToast(response.message.text, response.message.type == 'error' ? 'danger' : response.message.type);
    }).catch(error => {
      throw(error);
    });
  };
}