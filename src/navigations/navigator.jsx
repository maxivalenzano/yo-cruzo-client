import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

function AppRoute() {
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}

      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default AppRoute;
