import {OPEN_DRAWER, CLOSE_DRAWER} from '../actions/types';

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerState: 'opened',
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerState: 'closed',
      };
    default:
      return state;
  }
}
