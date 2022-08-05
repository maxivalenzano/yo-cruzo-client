import * as React from 'react';
import {
  StyleSheet,
  View, Text, Image, TextInput, Pressable, Button,
} from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>my first screen</Text>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
}

export default HomeScreen;
