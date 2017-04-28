import * as types from './types';
import sessionApi from '../api/SessionApi';

export function message(message, level) {
  return {
    type: types.ADD_NOTIFICATION,
    message: message,
    level: level
  }
}

export function logInUser(credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (response.status == '404') {
        dispatch(message('Невірні данні', 'error'));
      } else {
        dispatch({
          type: types.LOG_IN_SUCCESS,
          session: {
            id: response.id,
            jwt: response.jwt
          }
        });
        dispatch(message('Ви ввійшли', 'success'))
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
    dispatch(message('Ви вийшли', 'success'))
  }
}
