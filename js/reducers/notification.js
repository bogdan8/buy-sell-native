import type {Action} from '../actions/types';
import {ADD_NOTIFICATION} from '../actions/notification';

export type State = {
  list: string
}

export default function (state: State = {}, action: Action): State {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level,
        position: 'bc'
      });

    default:
      return state;
  }
}
