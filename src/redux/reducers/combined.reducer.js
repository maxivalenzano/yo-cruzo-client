import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';

const combinedReducer = combineReducers({
  alert,
  authentication,
});

export default combinedReducer;
