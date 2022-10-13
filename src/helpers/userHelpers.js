import dispatch from './dispatch';
import store from '../redux/store';
import userActions from '../redux/actions/user.actions';

function getCurrentSession() {
  const { authentication } = store.getState();
  if (!authentication.user) return dispatch(userActions.logout());
  return authentication.user;
}

const userHelpers = {
  getCurrentSession,
};
export default userHelpers;
