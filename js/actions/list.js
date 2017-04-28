import * as types from './types';

export function setIndex(index) {
  return function (dispatch) {
    dispatch({
      type: types.SET_INDEX,
      payload: index,
    })
  };
}
