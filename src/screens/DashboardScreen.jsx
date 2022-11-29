/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

function DashboardScreen() {
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
        {userAuth?.name}
      </Text>
      <Text style={{ textAlign: 'center', marginVertical: 10, marginTop: 14 }}>
        Pantalla en desarrollo
      </Text>
    </View>
  );
}

export default DashboardScreen;
