import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTripPage from '../components/SearchTrips/SearchTripPage/SearchTripPage';

const Stack = createNativeStackNavigator();

function SearchTripNavigator() {
  return (
    <Stack.Navigator initialRouteName="SearchTripPage">
      <Stack.Screen name="SearchTripPage" component={SearchTripPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SearchTripNavigator;
