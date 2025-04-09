import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AppRoute from './src/navigations/AppRoute';
import store from './src/redux/store';
import SnackBar from './src/controls/Snackbar';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <ActionSheetProvider>
          <AppRoute />
        </ActionSheetProvider>
        <SnackBar />
      </Provider>
    </SafeAreaProvider>
  );
}
