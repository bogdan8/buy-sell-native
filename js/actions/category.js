import * as types from './types';
import categoryApi from '../api/CategoryApi';

/* Get all categories */
export function allCategories() {
  return function (dispatch) {
    return categoryApi.getAllCategories().then(response => {
      dispatch({
        type: types.GET_ALL_CATEGORIES,
        categories: response
      });
    }).catch(error => {
      throw(error);
    });
  };
}