import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PendingTripPage from '../components/PendingTrips/PendingTripPage/PendingTripPage';

const Stack = createNativeStackNavigator();

function PendingTripsNavigator() {
  return (
    <Stack.Navigator initialRouteName="PendingTripList">
      <Stack.Screen name="PendingTripList" component={PendingTripPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default PendingTripsNavigator;
