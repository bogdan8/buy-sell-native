import type {Action} from './types';
import categoryApi from '../api/CategoryApi';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

/* Get all categories */
export function allCategories(): Action {
  return function (dispatch) {
    return categoryApi.getAllCategories().then(response => {
      dispatch({
        type: GET_ALL_CATEGORIES,
        categories: response.body
      });
    }).catch(error => {
      throw(error);
    });
  };
}