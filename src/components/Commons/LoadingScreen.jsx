import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBarHeight } from './Container';
import yoCruzoLogo from '../../assets/yoCruzoLogo.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBarHeight,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
});

function LoadingScreen({ message = 'Cargando...', subMessage = '' }) {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image source={yoCruzoLogo} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator size="large" color="#F85F6A" />
        <Text style={styles.loadingText}>{message}</Text>
        {subMessage ? <Text style={styles.subText}>{subMessage}</Text> : null}
      </View>
    </View>
  );
}

export default LoadingScreen;
