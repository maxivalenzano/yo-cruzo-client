import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarPage from '../components/CarPage/CarPage';
import ManageCard from '../components/ManageCar/ManageCar';
import EditCar from '../components/EditCar/EditCar';

const Stack = createNativeStackNavigator();

function CarsNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="CarList" component={CarPage} options={{ headerShown: false }} />
      <Stack.Screen name="ManageCard" component={ManageCard} options={{ headerShown: false }} />
      <Stack.Screen name="EditCar" component={EditCar} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default CarsNavigator;
