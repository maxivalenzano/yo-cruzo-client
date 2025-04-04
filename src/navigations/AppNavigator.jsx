import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import SearchTripList from '../components/SearchTrips/SearchTripList/SearchTripList';
import SearchTripView from '../components/SearchTrips/SearchTripView/SearchTripView';
import SuccessRequestScreen from '../components/SearchTrips/SearchTripView/SuccessRequestScreen';
import ChatScreen from '../components/Chat/ChatScreen';
import DriverRatings from '../components/Profile/DriverRatings';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchTripList" component={SearchTripList} options={{ headerShown: false }} />
      <Stack.Screen name="SearchTripView" component={SearchTripView} options={{ headerShown: false }} />
      <Stack.Screen name="SuccessRequest" component={SuccessRequestScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="DirectChat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DriverRatings"
        component={DriverRatings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
