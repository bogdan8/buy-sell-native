import {Actions} from 'react-native-router-flux';
import * as types from './types';
import sessionApi from '../api/SessionApi';
import {Toast} from 'native-base';

export function logInUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (response.status == '404') {
        Toast.show({
          text: 'Невірні данні',
          position: 'bottom',
          buttonText: 'X'
        });
      } else {
        dispatch({
          type: types.LOG_IN_SUCCESS,
          session: {
            id: response.id,
            jwt: response.jwt
          }
        });
        Actions.home();
        Toast.show({
          text: 'Ви ввійшли',
          position: 'bottom',
          buttonText: 'X'
        });
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function signOutUser(){
  return function (dispatch) {
    dispatch({
      type: types.LOG_OUT,
      session: {
        id: '',
        jwt: ''
      }
    });
    Actions.home();
    Toast.show({
      text: 'Ви вийшли',
      position: 'bottom',
      buttonText: 'X'
    });
  }
}
