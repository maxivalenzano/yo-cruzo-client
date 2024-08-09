import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTripList from '../components/SearchTrips/SearchTripList/SearchTripList';

const Stack = createNativeStackNavigator();

function ListTripNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SearchTripList" component={SearchTripList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ListTripNavigator;
