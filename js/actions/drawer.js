import * as types from './types';

export function openDrawer() {
  return function (dispatch) {
    dispatch({
      type: types.OPEN_DRAWER,
    });
    dispatch({
      type: types.ADD_NOTIFICATION,
      message: '',
      level: ''
    })
  };
}

export function closeDrawer() {
  return function (dispatch) {
    dispatch({
      type: types.CLOSE_DRAWER,
    })
  };
}
