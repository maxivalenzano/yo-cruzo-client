import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import user from './user.reducer';

const combinedReducer = combineReducers({
  alert,
  authentication,
  user,
});

export default combinedReducer;
