import * as types from '../actions/types';

export default function sessionReducer(state = [], action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return action.session;
    case types.LOG_OUT:
      return action.session;
    default:
      return state;
  }
}