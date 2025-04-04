import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppRoute from './src/navigations/Navigator';
import store from './src/redux/store';
import SnackBar from './src/controls/Snackbar';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppRoute />
        <SnackBar />
      </Provider>
    </SafeAreaProvider>
  );
}
