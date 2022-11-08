import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import user from './user.reducer';
import car from './car.reducer';
import trip from './trip.reducer';

const combinedReducer = combineReducers({
  alert,
  authentication,
  user,
  car,
  trip,
});

export default combinedReducer;
