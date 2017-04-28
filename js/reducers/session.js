import type {Action} from '../actions/types';
import {LOG_IN_SUCCESS, LOG_OUT} from '../actions/session';

export type State = {
  list: string
}

export default function (state: State = [], action: Action): State {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return action.session;
    case LOG_OUT:
      return action.session;
    default:
      return state;
  }
}