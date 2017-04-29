import {combineReducers} from 'redux';
import drawer from './drawer';
import categories from './categories';
import products from './products';
import session from './session';
import users from './users';
import notification from './notification';

export default combineReducers({
  drawer,
  categories,
  products,
  session,
  users,
  notification
});
