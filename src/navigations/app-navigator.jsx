import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Yo cruzo' }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Mi perfil' }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
