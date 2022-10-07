import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={RegisterScreen} options={{ title: 'Regístrate' }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
