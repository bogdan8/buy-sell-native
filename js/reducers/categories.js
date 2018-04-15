import * as types from '../actions/types';

export default function categories(state = [], action) {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}