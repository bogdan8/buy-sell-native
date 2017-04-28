import {ADD_NOTIFICATION} from './types';

export function addNotification(message, level) {
  return function (dispatch) {
    dispatch({
      type: ADD_NOTIFICATION,
      message,
      level
    })
  };
}