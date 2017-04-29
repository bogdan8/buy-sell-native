import * as types from './types';

export function addNotification(message, level) {
  return function (dispatch) {
    dispatch({
      type: types.ADD_NOTIFICATION,
      message,
      level
    })
  };
}