import type {Action} from './types';
import productApi from '../api/ProductApi';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/* Get all products */
export function allProducts(): Action {
  return function (dispatch) {
    return productApi.getAllProducts().then(response => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        products: JSON.parse(response)
      });
    }).catch(error => {
      throw(error);
    });
  };
}