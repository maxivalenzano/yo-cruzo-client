import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassengerTripsList from '../components/PassengerTrips/PassengerTripsList';
import PassengerTripView from '../components/PassengerTrips/PassengerTripView';

const Stack = createNativeStackNavigator();

function MyPassengerTripsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PassengerTripsList"
        component={PassengerTripsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PassengerTripView"
        component={PassengerTripView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MyPassengerTripsNavigator;
