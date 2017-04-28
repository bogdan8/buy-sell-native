import type {Action} from '../actions/types';
import {GET_ALL_PRODUCTS} from '../actions/product';

export type State = {
  list: string
}

export default function (state: State = [], action: Action): State {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}