import {Actions} from 'react-native-router-flux';
import * as types from './types';
import sessionApi from '../api/SessionApi';
import {showToast} from '../helpers/helpers';

export function logInUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (response.status == '404') {
        showToast('Невірні данні', 'danger');
      } else {
        dispatch({
          type: types.LOG_IN_SUCCESS,
          session: {
            id: response.id,
            jwt: response.jwt,
            avatar: response.avatar,
            username: response.username
          }
        });
        Actions.home();
        showToast('Ви ввійшли', 'success');
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function signOutUser() {
  return function (dispatch) {
    dispatch({
      type: types.LOG_OUT,
      session: {
        id: '',
        jwt: '',
        avatar: '',
        username: ''
      }
    });
    Actions.home();
    showToast('Ви вийшли', 'success');
  }
}
