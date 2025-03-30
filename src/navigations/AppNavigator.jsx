import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import SearchTripList from '../components/SearchTrips/SearchTripList/SearchTripList';
import SearchTripView from '../components/SearchTrips/SearchTripView/SearchTripView';
import SuccessRequestScreen from '../components/SearchTrips/SearchTripView/SuccessRequestScreen';
import ChatScreen from '../components/Chat/ChatScreen';

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
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.title || 'Chat',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#F85F6A',
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
