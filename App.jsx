import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/navigations/Navigator';
import store from './src/redux/store';
import SnackBar from './src/controls/Snackbar';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoute />
      <StatusBar style="auto" />
      <SnackBar />
    </Provider>
  );
}
