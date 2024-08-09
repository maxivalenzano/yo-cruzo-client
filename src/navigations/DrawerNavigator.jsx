/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import ProfileNavigator from './ProfileNavigator';
import TripsNavigator from './TripsNavigator';
import CarsNavigator from './CarsNavigator';
import CustomDrawer from './CustomDrawer';
import SearchTripNavigator from './SearchTripNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#FEEFF0',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >

      <Drawer.Screen
        name="SearchTrip"
        component={SearchTripNavigator}
        options={{
          // headerShown: false,
          title: 'Yo cruzo',
          drawerIcon: ({ focused }) => <Ionicons name="home" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />,
        }}
      />
      <Drawer.Screen
        name="ProfilePage"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          title: 'Mi perfil',
          drawerIcon: ({ focused }) => <Ionicons name="person" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />,
        }}
      />
      <Drawer.Screen
        name="CarPage"
        component={CarsNavigator}
        options={{
          headerShown: false,
          title: 'Mis autos',
          drawerIcon: ({ focused }) => <Ionicons name="car" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />,
        }}
      />
      <Drawer.Screen
        name="TripPage"
        component={TripsNavigator}
        options={{
          headerShown: false,
          title: 'Mis viajes',
          drawerIcon: ({ focused }) => <Ionicons name="list" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
