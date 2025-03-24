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

const savePushToken = async (token) => {
  try {
    await AsyncStorage.setItem('@push_token', token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('savePushToken ~ error:', e);
  }
};

const getPushToken = async () => {
  try {
    return await AsyncStorage.getItem('@push_token');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('getPushToken ~ error:', e);
    return null;
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
  savePushToken,
  getPushToken,
};
export default userHelpers;
