import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import user from './user.reducer';
import car from './car.reducer';
import trip from './trip.reducer';
import roleReducer from './role.reducer';
import tripRequest from './tripRequest.reducer';
import notification from './notification.reducer';
import chat from './chat.reducer';
import rating from './rating.reducer';

const combinedReducer = combineReducers({
  alert,
  authentication,
  user,
  car,
  trip,
  role: roleReducer,
  tripRequest,
  notification,
  chat,
  rating,
});

export default combinedReducer;
