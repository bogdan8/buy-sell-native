import * as types from '../actions/types';

export default function products(state = [], action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}