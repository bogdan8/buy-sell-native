import * as types from './types';
import productApi from '../api/ProductApi';
import {showToast} from '../helpers/helpers';

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

/* Create product */
export function addProduct(paramsProduct, jwt) {
  return (dispatch) => {
    return productApi.createProduct(paramsProduct, jwt).then(response => {
      dispatch({
        type: types.ADD_PRODUCT,
        products: paramsProduct
      });
      showToast(response.message.text, response.message.type == 'error' ? 'danger' : response.message.type );
    }).catch(error => {
      throw(error);
    });
  };
}