import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import user from './user.reducer';
import car from './car.reducer';

const combinedReducer = combineReducers({
  alert,
  authentication,
  user,
  car,
});

export default combinedReducer;
