import * as types from './types';
import productApi from '../api/ProductApi';

/* Get all products */
export function allProducts() {
  return function (dispatch) {
    return productApi.getAllProducts().then(response => {
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        products: JSON.parse(response)
      });
    }).catch(error => {
      throw(error);
    });
  };
}