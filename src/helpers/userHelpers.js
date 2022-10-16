import dispatch from './dispatch';
import store from '../redux/store';
import { userConstants } from '../constants';

function getCurrentSession() {
  const { authentication } = store.getState();
  if (!authentication.user) return dispatch({ type: userConstants.LOGOUT });
  return authentication.user;
}

const userHelpers = {
  getCurrentSession,
};
export default userHelpers;
