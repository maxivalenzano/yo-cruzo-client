import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View, Text, Image, TextInput, Pressable, Button,
  StyleSheet,
} from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('LoginScreen')}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
export default DetailsScreen;
