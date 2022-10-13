import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button } from 'react-native-paper';

import userActions from '../redux/actions/user.actions';


function DashboardScreen() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.authentication.user);
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
        {userAuth?.username}
      </Text>
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        Está conectado a lo que será la mejor app del NEA
      </Text>
      <Button
        style={{ marginVertical: 10 }}
        mode="contained"
        onPress={() => dispatch(userActions.logout())}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}

export default DashboardScreen;
