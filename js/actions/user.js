import {Toast} from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as types from './types';
import userApi from '../api/UserApi';

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
      Actions.signin();
      Toast.show({
        text: response.message.text,
        position: 'bottom',
        buttonText: 'X'
      });
    }).catch(error => {
      throw(error);
    });
  };
}