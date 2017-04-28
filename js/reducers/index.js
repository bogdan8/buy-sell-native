import {combineReducers} from 'redux';

import drawer from './drawer';
import list from './list';
import categories from './categories';
import products from './products';
import session from './session';
import users from './users';

export default combineReducers({

  drawer,
  list,
  categories,
  products,
  session,
  users

});
