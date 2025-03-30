import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';

export const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('@user_session');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('removeSession ~ error:', e);
  }
};

export const getCurrentSession = () => {
  const { authentication } = store.getState();
  if (!authentication.user) return removeSession();
  return authentication.user;
};

export const getCurrentUserId = () => {
  const { authentication } = store.getState();
  if (!authentication.user) return null;
  return authentication.user.id;
};
