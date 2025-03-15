import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import SearchTripList from '../components/SearchTrips/SearchTripList/SearchTripList';
import SearchTripView from '../components/SearchTrips/SearchTripView/SearchTripView';
import SuccessRequestScreen from '../components/SearchTrips/SearchTripView/SuccessRequestScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchTripList" component={SearchTripList} options={{ headerShown: false }} />
      <Stack.Screen name="SearchTripView" component={SearchTripView} options={{ headerShown: false }} />
      <Stack.Screen name="SuccessRequest" component={SuccessRequestScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
