import combinedReducer from './combined.reducer';
import { userConstants } from '../../constants';

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    return combinedReducer({}, action);
  }
  return combinedReducer(state, action);
};

export default rootReducer;
