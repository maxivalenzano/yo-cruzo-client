import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';
import CarsNavigator from './CarsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Yo cruzo' }} />
      <Drawer.Screen name="Account" component={AccountScreen} options={{ title: 'Mi perfil' }} />
      <Drawer.Screen name="CarPage" component={CarsNavigator} options={{ headerShown: false, title: 'Mis Autos' }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
