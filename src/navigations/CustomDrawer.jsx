/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import userHelpers from '../helpers/userHelpers';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';
import roleActions from '../redux/actions/role.actions';
import { StatusBarHeight } from '../components/Commons/Container';

const ROLE_STORAGE_KEY = '@user_role_preference';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: StatusBarHeight,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    backgroundColor: '#F85F6A10',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  roleSwitcher: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: '#F85F6A',
  },
  roleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  roleTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerButtonText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  footerButtonDanger: {
    color: '#F85F6A',
  },
  divider: {
    height: 1,
    backgroundColor: '#f4f4f4',
    marginVertical: 8,
  },
  logo: {
    alignItems: 'center',
    padding: 20,
    // opacity: 0.0,
  },
  contentContainerStyle: { paddingTop: 0 },
});

function CustomDrawer(props) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authentication.user);
  const isDriver = useSelector((state) => state.role.isDriver);
  const [animation] = useState(new Animated.Value(0));
  const [notificationUpdateKey, setNotificationUpdateKey] = useState(0);

  // Actualizar el contador de notificaciones al abrir el drawer
  useEffect(() => {
    // Este efecto se ejecuta cada vez que el drawer se abre
    const unsubscribe = props.navigation.addListener('drawerOpen', () => {
      // Forzar actualización del badge de notificaciones
      setNotificationUpdateKey((prev) => prev + 1);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const loadRolePreference = async () => {
      try {
        const savedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);
        if (savedRole !== null) {
          dispatch(roleActions.setRole(savedRole === 'driver'));
        }
      } catch (error) {
        console.error('Error loading role preference:', error);
      }
    };
    loadRolePreference();
  }, [dispatch]);

  const handleRoleSwitch = async (value) => {
    try {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      dispatch(roleActions.setRole(value));
      await AsyncStorage.setItem(ROLE_STORAGE_KEY, value ? 'driver' : 'passenger');
      props.navigation.navigate('SearchTrip');
    } catch (error) {
      console.error('Error saving role preference:', error);
    }
  };

  const animatedStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.95, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <NotificationContext.Provider value={notificationUpdateKey}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              {authUser?.profileImage ? (
                <Avatar.Image size={50} source={{ uri: authUser.profileImage }} />
              ) : (
                <Ionicons name="person-circle" size={50} color="#666" />
              )}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{authUser?.name || 'Usuario'}</Text>
                <Text style={styles.userEmail}>{authUser?.email}</Text>
              </View>
            </View>

            <Animated.View style={[styles.roleSwitcher, animatedStyle]}>
              <TouchableOpacity
                style={[styles.roleButton, !isDriver && styles.roleButtonActive]}
                onPress={() => handleRoleSwitch(false)}
              >
                <Ionicons name="person" size={18} color={!isDriver ? '#fff' : '#666'} />
                <Text style={[styles.roleText, !isDriver && styles.roleTextActive]}>Pasajero</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, isDriver && styles.roleButtonActive]}
                onPress={() => handleRoleSwitch(true)}
              >
                <Ionicons name="car" size={18} color={isDriver ? '#fff' : '#666'} />
                <Text style={[styles.roleText, isDriver && styles.roleTextActive]}>Conductor</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.content}>
            <DrawerItemList {...props} />
          </View>

          {/* <View style={styles.drawerContainer} /> */}
        </DrawerContentScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => {}}>
            <Ionicons name="help-circle" size={22} color="#666" />
            <Text style={styles.footerButtonText}>Ayuda y soporte</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => dispatch(userHelpers.logout())}
          >
            <Ionicons name="log-out" size={22} color="#F85F6A" />
            <Text style={[styles.footerButtonText, styles.footerButtonDanger]}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logo}>
          <Avatar.Image size={100} source={yoCruzoLogo} />
        </View>
      </NotificationContext.Provider>
    </View>
  );
}

// Creamos un contexto para pasar la clave de actualización a los componentes que lo necesiten
export const NotificationContext = React.createContext(0);
export default CustomDrawer;
