import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverHomePage from '../components/Driver/DriverHomePage/DriverHomePage';

const Stack = createNativeStackNavigator();

function DriverHomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="DriverHome">
      <Stack.Screen
        name="DriverHome"
        component={DriverHomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DriverHomeNavigator;
