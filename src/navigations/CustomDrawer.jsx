/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Avatar from 'react-native-boring-avatars';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar as AvatarPaper } from 'react-native-paper';
import userHelpers from '../helpers/userHelpers';
import Separator from '../components/Controls/Separator';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  containerFooter: { padding: 20 },
  profileContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20,
  },
  userName: { fontSize: 18, marginBottom: 5, marginTop: 10 },
  email: { color: '#D2DAE2', marginRight: 5 },
  drawerContainer: { flex: 1, marginTop: 10 },
  itemFooter: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  textFooter: { marginLeft: 8, fontSize: 15 },
  avatar: {
    paddingBottom: 30, justifyContent: 'center', alignItems: 'center',
  },
  yoCruzoLogo: { opacity: 0.5, backgroundColor: 'transparent' },
});

function CustomDrawer(props) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authentication.user);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Avatar
            size={80}
            name={authUser?.email}
            variant="beam"
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
          <Text style={styles.userName}>
            {authUser?.name}
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
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.itemFooter}>
            <Ionicons name="settings-sharp" size={22} color="#D2DAE2" />
            <Text style={styles.textFooter}>
              Ajustes
            </Text>
          </View>
        </TouchableOpacity>
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
  );
}

export default CustomDrawer;
