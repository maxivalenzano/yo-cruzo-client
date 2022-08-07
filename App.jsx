/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  Button, Text, TextInput, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducer from './src/context/reducer';
import Store from './src/context/authContext';
import authServices from './src/services/authServices';

const initialState = {
  isLoading: false,
  isSignOut: false,
  userToken: null,
};

function HomeScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <View>
      <Text>Hola estoy logueado en el server de Otto</Text>
      <Button title="Cerrar sesión" onPress={dispatch(authServices.signOut)} />
    </View>
  );
}

function SignInScreen({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={() => dispatch(authServices.signIn({ username, password }))} />
      <Text>
        ------- ó -------
      </Text>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={() => dispatch(authServices.signUp({ email, username, password }))} />
      <Text>
        ------- ó -------
      </Text>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  const [state] = React.useReducer(reducer, initialState);

  return (
    <Store.Provider value={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Iniciar sesión',
                  // When logging out, a pop animation feels intuitive
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Registrarse',
                }}
              />
            </>
          ) : (
            <Stack.Screen name="Yo cruzo" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Store.Provider>
  );
}

export default App;
