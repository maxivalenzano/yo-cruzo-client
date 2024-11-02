/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ProfileNavigator from './ProfileNavigator';
import TripsNavigator from './TripsNavigator';
import CarsNavigator from './CarsNavigator';
import CustomDrawer from './CustomDrawer';
import SearchTripNavigator from './SearchTripNavigator';
import MyPassengerTripsNavigator from './MyPassengerTripsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const isDriver = useSelector((state) => state.role.isDriver);

  if (isDriver) {
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
            title: 'Yo cruzo',
            drawerIcon: ({ focused }) => (
              <Ionicons name="home" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
            ),
          }}
        />
        <Drawer.Screen
          name="ProfilePage"
          component={ProfileNavigator}
          options={{
            headerShown: false,
            title: 'Mi perfil',
            drawerIcon: ({ focused }) => (
              <Ionicons name="person" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
            ),
          }}
        />
        <Drawer.Screen
          name="CarPage"
          component={CarsNavigator}
          options={{
            headerShown: false,
            title: 'Mis autos',
            drawerIcon: ({ focused }) => (
              <Ionicons name="car" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
            ),
          }}
        />
        <Drawer.Screen
          name="CreatedTrips"
          component={TripsNavigator}
          options={{
            headerShown: false,
            title: 'Mis viajes creados',
            drawerIcon: ({ focused }) => (
              <Ionicons name="clipboard" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

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
          title: 'Buscar viajes',
          drawerIcon: ({ focused }) => (
            <Ionicons name="search" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfilePage"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          title: 'Mi perfil',
          drawerIcon: ({ focused }) => (
            <Ionicons name="person" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyTrips"
        component={MyPassengerTripsNavigator}
        options={{
          headerShown: false,
          title: 'Mis viajes reservados',
          drawerIcon: ({ focused }) => (
            <Ionicons name="bookmark" size={22} color={focused ? '#F85F6A' : '#D2DAE2'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
