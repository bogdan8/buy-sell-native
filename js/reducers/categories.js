import type {Action} from '../actions/types';
import {GET_ALL_CATEGORIES} from '../actions/category';

export type State = {
  list: string
}

export default function (state: State = [], action: Action): State {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}