import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripPage from '../components/Trips/TripPage/TripPage';
import CreateTrip from '../components/Trips/CreateTrip/CreateTrip';
import EditTrip from '../components/Trips/EditTrip/EditTrip';
import ManageTrip from '../components/Trips/ManageTrip/ManageTrip';
import ChatScreen from '../components/Chat/ChatScreen';

const Stack = createNativeStackNavigator();

function TripsNavigator() {
  return (
    <Stack.Navigator initialRouteName="TripList">
      <Stack.Screen name="TripList" component={TripPage} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTrip" component={CreateTrip} options={{ headerShown: false }} />
      <Stack.Screen name="EditTrip" component={EditTrip} options={{ headerShown: false }} />
      <Stack.Screen name="ManageTrip" component={ManageTrip} options={{ headerShown: false }} />
      <Stack.Screen name="DirectChat" component={ChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default TripsNavigator;
