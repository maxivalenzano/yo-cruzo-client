import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsScreen from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator();

function NotificationsNavigator() {
  return (
    <Stack.Navigator initialRouteName="NotificationsList">
      <Stack.Screen
        name="NotificationsList"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default NotificationsNavigator;
