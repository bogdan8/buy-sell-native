import {Actions} from 'react-native-router-flux';
import type {Action} from './types';
import sessionApi from '../api/SessionApi';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export function message(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message: message,
    level: level
  }
}

export function logInUser(credentials): Action {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (response.status == '404') {
        dispatch(message('Невірні данні', 'error'));
      } else {
        dispatch({
          type: LOG_IN_SUCCESS,
          session: {
            id: response.id,
            jwt: response.jwt
          }
        });
        dispatch(message('Ви ввійшли', 'success'));
        Actions.products()
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function signOutUser(): Action{
  return function (dispatch) {
    dispatch({
      type: LOG_OUT,
      session: {
        id: '',
        jwt: ''
      }
    });
    dispatch(message('Ви вийшли', 'success'));
    Actions.products()
  }
}
