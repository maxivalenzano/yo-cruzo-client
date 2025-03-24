import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { userActions } from '../redux/actions';
import { registerForPushNotificationsAsync } from '../services/NotificationService';

function AppRoute() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          dispatch(userActions.updatePushToken(token));
        }
      })
      .catch((error) => console.error('Error al obtener token de notificaciones:', error));
  }, [dispatch]);

  React.useEffect(() => {
    AsyncStorage.getItem('@user_session').then((user) => {
      if (user) {
        const userParsed = JSON.parse(user);
        dispatch(userActions.checkIfExistSession(userParsed));
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      {
      isLoggedIn
        ? <AppNavigator />
        : <AuthNavigator />
      }
    </NavigationContainer>
  );
}

export default AppRoute;
