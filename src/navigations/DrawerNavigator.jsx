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
import PendingTripsNavigator from './PendingTripsNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const isDriver = useSelector((state) => state.role.isDriver);

  const commonScreenOptions = {
    drawerActiveBackgroundColor: '#F85F6A15',
    drawerActiveTintColor: '#F85F6A',
    drawerInactiveTintColor: '#666',
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#f4f4f4',
    },
    headerTitleStyle: {
      fontWeight: '600',
    },
    drawerLabelStyle: {
      marginLeft: -15,
      fontSize: 15,
      fontWeight: '500',
    },
    drawerStyle: {
      backgroundColor: '#fff',
      width: 280,
    },
  };

  const driverScreens = [
    {
      name: 'SearchTrip',
      component: SearchTripNavigator,
      options: {
        title: 'Inicio',
        iconName: 'home',
        headerTitle: 'Yo Cruzo',
      },
    },
    {
      name: 'CreatedTrips',
      component: TripsNavigator,
      options: {
        title: 'Mis viajes creados',
        iconName: 'document-text',
        headerShown: false,
        headerTitle: 'Mis Viajes',
      },
    },
    {
      name: 'PendingTripRequest',
      component: PendingTripsNavigator,
      options: {
        title: 'Solicitudes de viajes',
        iconName: 'people',
        headerShown: false,
        headerTitle: 'Mis Viajes',
      },
    },
    {
      name: 'CarPage',
      component: CarsNavigator,
      options: {
        title: 'Mis vehículos',
        iconName: 'car',
        headerShown: false,
      },
    },
    {
      name: 'ProfilePage',
      component: ProfileNavigator,
      options: {
        title: 'Mi perfil',
        iconName: 'person',
        headerShown: false,
      },
    },
  ];

  const passengerScreens = [
    {
      name: 'SearchTrip',
      component: SearchTripNavigator,
      options: {
        title: 'Buscar viajes',
        iconName: 'search',
        headerTitle: 'Yo Cruzo',
      },
    },
    {
      name: 'MyTrips',
      component: MyPassengerTripsNavigator,
      options: {
        title: 'Mis viajes reservados',
        iconName: 'bookmark',
        headerShown: false,
      },
    },
    {
      name: 'ProfilePage',
      component: ProfileNavigator,
      options: {
        title: 'Mi perfil',
        iconName: 'person',
        headerShown: false,
      },
    },
  ];

  const screens = isDriver ? driverScreens : passengerScreens;

  return (
    <Drawer.Navigator
      id="DrawerNavigator"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ route }) => ({
        ...commonScreenOptions,
        drawerIcon: ({ focused, size }) => {
          const screen = screens.find((s) => s.name === route.name);
          return (
            <Ionicons
              name={screen?.options.iconName}
              size={size}
              color={focused ? '#F85F6A' : '#666'}
            />
          );
        },
      })}
    >
      {screens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
