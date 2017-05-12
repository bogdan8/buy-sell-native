import {
  GET_ALL_PRODUCTS
} from '../actions/types';

export default function products(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}