import * as types from './types';

export function openDrawer() {
  return function (dispatch) {
    dispatch({
      type: types.OPEN_DRAWER,
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
