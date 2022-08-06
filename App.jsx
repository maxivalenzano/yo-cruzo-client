/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  Button, Text, TextInput, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from './src/axios/axios';

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Hola estoy logueado en el server de Otto</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();

function App({ navigation }) {
  const initialState = {
    isLoading: false,
    isSignout: false,
    userToken: null,
  };
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return { ...prevState, userToken: action.token, isLoading: false };
        case 'SIGN_IN':
          return { ...prevState, isSignout: false, userToken: action.token };
        case 'SIGN_OUT':
          return { ...prevState, isSignout: true, userToken: null };
        default:
          return initialState;
      }
    },
    initialState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const login = await axios.post('/api/auth/signin', data)
          .then((response) => response.data)
          .catch((err) => { console.error(err); });
        if (login) dispatch({ type: 'SIGN_IN', token: login });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other
        //  encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Iniciar sesión',
                // When logging out, a pop animation feels intuitive
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Yo cruzo" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
