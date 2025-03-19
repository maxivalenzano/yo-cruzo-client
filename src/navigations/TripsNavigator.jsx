import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripPage from '../components/Trips/TripPage/TripPage';
import CreateTrip from '../components/Trips/CreateTrip/CreateTrip';
import EditTrip from '../components/Trips/EditTrip/EditTrip';

const Stack = createNativeStackNavigator();

function TripsNavigator() {
  return (
    <Stack.Navigator initialRouteName="TripList">
      <Stack.Screen name="TripList" component={TripPage} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTrip" component={CreateTrip} options={{ headerShown: false }} />
      <Stack.Screen name="EditTrip" component={EditTrip} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default TripsNavigator;
