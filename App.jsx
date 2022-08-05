import * as React from 'react';
import {
  StyleSheet,
  View, Text, Image, TextInput, Pressable, Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import HomeScreen from './src/components/HomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
import LoginScreen from './src/components/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Yo cruzo',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  inputPersonalizado: {
    marginTop: '3%',
    backgroundColor: '#eeeeee00',
  },
  textContainer: {
    marginTop: '5%',
    marginLeft: '0%',
    marginRight: 'auto',
    fontSize: 22,
    color: '#00A5AE',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
export default App;
