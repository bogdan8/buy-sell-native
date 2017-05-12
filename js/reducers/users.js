import * as types from '../actions/types';

export default function users(state = [], action) {
  switch (action.type) {
    case types.GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}