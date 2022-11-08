import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from '../screens/DashboardScreen';
import ProfileNavigator from './ProfileNavigator';
import TripsNavigator from './TripsNavigator';
import CarsNavigator from './CarsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Yo cruzo' }} />
      <Drawer.Screen name="ProfilePage" component={ProfileNavigator} options={{ headerShown: false, title: 'Mi perfil' }} />
      <Drawer.Screen name="CarPage" component={CarsNavigator} options={{ headerShown: false, title: 'Mis autos' }} />
      <Drawer.Screen name="TripPage" component={TripsNavigator} options={{ headerShown: false, title: 'Mis viajes' }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
