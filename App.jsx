import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source="https://instagram.faep6-1.fna.fbcdn.net/v/t51.2885-19/289082099_1023048275247055_7801578516483573379_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.faep6-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Aq2VVwZyCRsAX-tDmmx&tn=XXGGyuFTgASw_nMW&edm=APU89FABAAAA&ccb=7-5&oh=00_AT_lYMkyI0-ZWO5fABMzM2b7Y2L5utEk6vuNbGLd_UIH2A&oe=62EF741F&_nc_sid=86f79a"
    />
  );
}

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

function DetailsScreen({ navigation }) {
  const { control, handleSubmit, errors, watch } = useForm();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text style={styles.textContainer}>Datos personales:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.inputPersonalizado}
            returnKeyType="next"
            label="Nombre"
            mode="flat"
            value={value}
            onChangeText={(value) => onChange(value)}
            theme={{ colors: { primary: '#00A5AE' } }}
          />
        )}
        name="nombre"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.inputPersonalizado}
            returnKeyType="next"
            label="Apellido"
            mode="flat"
            value={value} //
            onChangeText={(value) => onChange(value)}
            theme={{ colors: { primary: '#00A5AE' } }}
          />
        )}
        name="apellido"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.inputPersonalizado}
            returnKeyType="next"
            label="DNI"
            mode="flat"
            value={value} //
            onChangeText={(value) => onChange(value)}
            theme={{ colors: { primary: '#00A5AE' } }}
            keyboardType="numeric"
          />
        )}
        name="dni"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.inputPersonalizado}
            returnKeyType="next"
            label="Email"
            mode="flat"
            value={value} //
            onChangeText={(value) => onChange(value)}
            theme={{ colors: { primary: '#00A5AE' } }}
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        )}
        name="email"
        defaultValue=""
      />

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
          component={DetailsScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputPersonalizadoPass: {
    marginTop: '3%',
    backgroundColor: '#eeeeee00',
    flex: 1,
  },
  iconPass: {
    position: 'absolute',
    paddingTop: '45%',
  },
  errors: {
    color: 'red',
  },
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
