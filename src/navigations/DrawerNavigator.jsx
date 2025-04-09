/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import ProfileNavigator from './ProfileNavigator';
import TripsNavigator from './TripsNavigator';
import CarsNavigator from './CarsNavigator';
import CustomDrawer, { NotificationContext } from './CustomDrawer';
import SearchTripNavigator from './SearchTripNavigator';
import MyPassengerTripsNavigator from './MyPassengerTripsNavigator';
import PendingTripsNavigator from './PendingTripsNavigator';
import NotificationsNavigator from './NotificationsNavigator';
import NotificationBadge from '../components/NotificationBadge';
import DriverHomeNavigator from './DriverHomeNavigator';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#F85F6A',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function DrawerNavigator() {
  const isDriver = useSelector((state) => state.role.isDriver);
  const chatUnreadCount = useSelector((state) => state.chat.unreadCount);

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
      name: 'DriverHome',
      component: DriverHomeNavigator,
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
      },
    },
    {
      name: 'PendingTripRequest',
      component: PendingTripsNavigator,
      options: {
        title: 'Solicitudes de viajes',
        iconName: 'people',
        headerShown: false,
      },
    },
    {
      name: 'Notifications',
      component: NotificationsNavigator,
      options: {
        title: 'Notificaciones',
        iconName: 'notifications',
        headerShown: false,
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
      name: 'Notifications',
      component: NotificationsNavigator,
      options: {
        title: 'Notificaciones',
        iconName: 'notifications',
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
          if (screen?.options.iconName === 'notifications') {
            return (
              <View style={{ position: 'relative' }}>
                <Ionicons
                  name={screen?.options.iconName}
                  size={size}
                  color={focused ? '#F85F6A' : '#666'}
                />
                <NotificationContext.Consumer>
                  {(updateKey) => <NotificationBadge forceUpdate={updateKey} />}
                </NotificationContext.Consumer>
              </View>
            );
          }

          if (screen?.options.iconName === 'chatbubbles' && chatUnreadCount > 0) {
            return (
              <View style={{ position: 'relative' }}>
                <Ionicons
                  name={screen?.options.iconName}
                  size={size}
                  color={focused ? '#F85F6A' : '#666'}
                />
                <View style={styles.unreadBadge}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {chatUnreadCount > 99 ? '99+' : chatUnreadCount}
                  </Text>
                </View>
              </View>
            );
          }

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
