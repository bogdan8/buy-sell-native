import {SET_INDEX} from '../actions/types';

const initialState = {
  list: [],
  selectedIndex: undefined,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    default:
      return state;
  }
}
