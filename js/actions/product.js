import {Actions} from 'react-native-router-flux';
import * as types from './types';
import productApi from '../api/ProductApi';
import {showToast} from '../helpers/helpers';

/* Get all products */
export function allProducts(per) {
  return function (dispatch) {
    return productApi.getAllProducts(per).then(response => {
      dispatch({
        type: types.GET_ALL_PRODUCTS,
        products: JSON.parse(response)
      });
    }).catch(error => {
      throw(error);
    });
  };
}

/* Get all product with chose category */
export function fetchProductWithCategory(category_id, per) {
  return function (dispatch) {
    return productApi.getProductWithCategory(category_id, per).then(response => {
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
      if (response.message.type == 'success') {
        Actions.home();
      }
      showToast(response.message.text, response.message.type == 'error' ? 'danger' : response.message.type);
    }).catch(error => {
      throw(error);
    });
  };
}