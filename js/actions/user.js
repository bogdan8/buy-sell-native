import type {Action} from './types';
import userApi from '../api/UserApi';

export const GET_ALL_USERS = 'GET_ALL_USERS';

export function message(message, level) {
  return {
    type: types.ADD_NOTIFICATION,
    message: message,
    level: level
  }
}

/* Get all users */
export function allUsers(jwt): Action {
  return function (dispatch) {
    return userApi.getAllUsers(jwt).then(response => {
      dispatch({
        type: GET_ALL_USERS,
        users: response.body
      });
    }).catch(error => {
      throw(error);
    });
  };
}


/* Registration user */
export function addUser(paramsUser): Action {
  return (dispatch) => {
    return userApi.createUser(paramsUser).then(response => {
      dispatch(message(response.message.text, response.message.type));
    }).catch(error => {
      throw(error);
    });
  };
}