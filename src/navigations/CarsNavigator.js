import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarPage from '../components/Cars/CarPage/CarPage';
import ManageCard from '../components/Cars/ManageCar/ManageCar';
import EditCar from '../components/Cars/EditCar/EditCar';

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
