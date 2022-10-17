import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { userActions } from '../redux/actions';

function AppRoute() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);

  React.useEffect(() => {
    AsyncStorage.getItem('@user_session')
      .then((user) => {
        if (user) {
          dispatch(userActions.checkIfExistSession(JSON.parse(user)));
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
