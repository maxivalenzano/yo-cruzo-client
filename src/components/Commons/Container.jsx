import React from 'react';
import {
  StyleSheet, View, Platform, StatusBar,
} from 'react-native';

export const StatusBarHeight = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight + 10,
  default: 0,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBarHeight,
  },
});

function Container({ children }) {
  return <View style={styles.container}>{children}</View>;
}

export default Container;
