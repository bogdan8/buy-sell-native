import * as types from '../actions/types';

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_DRAWER:
      return {
        ...state,
        drawerState: 'opened',
      };
    case types.CLOSE_DRAWER:
      return {
        ...state,
        drawerState: 'closed',
      };
    default:
      return state;
  }
}
