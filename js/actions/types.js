export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_LIST', list: string}
    | { type: 'GET_ALL_CATEGORIES', list: string}
    | { type: 'ADD_NOTIFICATION', list: string}
    | { type: 'GET_ALL_PRODUCTS', list: string}
    | { type: 'LOG_IN_SUCCESS', list: string}
    | { type: 'LOG_OUT', list: string}
    | { type: 'GET_ALL_USERS', list: string}
