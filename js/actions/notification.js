import type {Action} from './types';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function addNotification(message, level): Action {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}