import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button } from 'react-native-paper';

import {
  selectUserName,
  setSignOut,
} from '../redux/slices/authSlice';


function DashboardScreen() {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}
    >
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Bienvenido
        {' '}
        {username}
      </Text>
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>Está conectado a lo que será la mejor app del NEA</Text>
      <Button
        style={{ marginVertical: 10 }}
        mode="contained"
        onPress={() => dispatch(setSignOut())}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}

export default DashboardScreen;
