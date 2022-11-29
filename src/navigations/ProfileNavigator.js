import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../components/Profile/EditProfile/EditProfile';
import ViewProfile from '../components/Profile/ViewProfile';

const Stack = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="ViewProfile">
      <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
