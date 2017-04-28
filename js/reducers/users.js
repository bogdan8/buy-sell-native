import type {Action} from '../actions/types';
import {GET_ALL_USERS} from '../actions/user';

export type State = {
  list: string
}

export default function (state: State = [], action: Action): State {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}