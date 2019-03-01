import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  itemsReducer: itemsReducer,
  userReducer: userReducer,
  messageReducer: messageReducer
});
