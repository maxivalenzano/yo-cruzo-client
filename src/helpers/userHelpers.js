import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatch from './dispatch';
import store from '../redux/store';
import { userConstants } from '../constants';

const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('@user_session');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('removeSession ~ error:', e);
  }
};

const saveSession = async (value) => {
  try {
    const userSession = JSON.stringify(value);
    await AsyncStorage.setItem('@user_session', userSession);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('storeData ~ error:', e);
  }
};

function logout() {
  removeSession();
  return { type: userConstants.LOGOUT };
}

function getCurrentSession() {
  const { authentication } = store.getState();
  if (!authentication.user) return dispatch(logout());
  return authentication.user;
}

const userHelpers = {
  logout,
  saveSession,
  removeSession,
  getCurrentSession,
};
export default userHelpers;
