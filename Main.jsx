/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import reducer from './src/context/reducer';
import Store from './src/context/authContext';
import authActions from './src/context/actions';

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
      <Button title="Cerrar sesión" onPress={dispatch(authActions.signOut)} />
    </View>
  );
}

function SignInScreen({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image size={130} source={require('./src/assets/yoCruzoLogo.jpeg')} />
      </View>
      <Text style={styles.headerText}>Hola! qué bueno verte de nuevo.</Text>
      <TextInput
        label="Nombre de usuario"
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.textInput}
      />
      <TextInput
        label="Contraseña"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => dispatch(authActions.signIn({ username, password }))}>
        Entrar
      </Button>
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        ¿No tienes una cuenta? puede crearse una:
      </Text>
      <Button mode="text" onPress={() => navigation.navigate('SignUp')}>
        Regístrate
      </Button>
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
      <TextInput placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Regístrate"
        onPress={() => dispatch(authActions.signUp({ email, username, password }))}
      />
      <Text>------- ó -------</Text>
      <Button title="Inicio de sesión" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}

const Stack = createStackNavigator();

function Main() {
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
                options={{ title: 'Inicio de sesión' }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Regístrate' }}
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  textInput: {
    marginVertical: 10,
  },
  avatar: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#c2c2c2',
    textAlign: 'center',
  },
  buttonText: {
    alignContent: 'center',
  },
});

export default Main;
