/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Avatar as AvatarPaper } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userHelpers from '../helpers/userHelpers';
import Separator from '../components/Controls/Separator';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';
import Container from '../components/Commons/Container';
import roleActions from '../redux/actions/role.actions';

const ROLE_STORAGE_KEY = '@user_role_preference';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerFooter: {
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
  },
  email: {
    color: '#D2DAE2',
    marginRight: 5,
    fontSize: 14,
  },
  drawerContainer: {
    flex: 1,
    marginTop: 10,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  textFooter: {
    marginLeft: 8,
    fontSize: 15,
  },
  avatar: {
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yoCruzoLogo: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  roleSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  roleSwitchText: {
    fontSize: 16,
    color: '#333',
  },
});

function CustomDrawer(props) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authentication.user);
  const isDriver = useSelector((state) => state.role.isDriver);

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
  }, [authUser, dispatch]);

  const handleRoleSwitch = async (value) => {
    try {
      dispatch(roleActions.setRole(value));
      await AsyncStorage.setItem(ROLE_STORAGE_KEY, value ? 'driver' : 'passenger');
      props.navigation.navigate('SearchTrip');
    } catch (error) {
      console.error('Error saving role preference:', error);
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              {authUser?.profileImage ? (
                <AvatarPaper.Image
                  size={80}
                  source={{ uri: authUser.profileImage }}
                />
              ) : (
                <Ionicons name="person-circle" size={80} color="#D2DAE2" />
              )}
            </View>
            <Text style={styles.userName}>
              {authUser?.name || 'Usuario'}
            </Text>
            <Text style={styles.email}>
              {authUser?.email}
            </Text>
          </View>

          <View style={styles.drawerContainer}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        <View style={styles.avatar}>
          <AvatarPaper.Image size={150} source={yoCruzoLogo} style={styles.yoCruzoLogo} />
        </View>

        <Separator />

        <View style={styles.containerFooter}>
          <View style={styles.roleSwitchContainer}>
            <Text style={styles.roleSwitchText}>
              Modo
              {' '}
              {isDriver ? 'Conductor' : 'Pasajero'}
            </Text>
            <Switch
              trackColor={{ false: '#D2DAE2', true: '#F85F6A' }}
              thumbColor={isDriver ? '#fff' : '#f4f3f4'}
              onValueChange={handleRoleSwitch}
              value={isDriver}
            />
          </View>
          {/* <TouchableOpacity onPress={() => {}}>
            <View style={styles.itemFooter}>
              <Ionicons name="settings-sharp" size={22} color="#D2DAE2" />
              <Text style={styles.textFooter}>
                Ajustes
              </Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => dispatch(userHelpers.logout())}>
            <View style={styles.itemFooter}>
              <Ionicons name="exit-outline" size={22} color="#D2DAE2" />
              <Text style={styles.textFooter}>
                Cerrar sesión
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

export default CustomDrawer;
