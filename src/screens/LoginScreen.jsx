import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Avatar, Snackbar } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { Feather } from '@expo/vector-icons';
import userActions from '../redux/actions/user.actions';

const passwordRules = {
  required: {
    value: true,
    message: "La contraseña es requerida",
  },
};

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.authentication.loggingIn);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const handleLogin = (data) => {
    dispatch(userActions.login(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image size={120} source={require('../assets/yoCruzoLogo.jpeg')} style={{backgroundColor: 'transparent'}}/>
      </View>
      <Text style={styles.headerText}>¡Hola! Que bueno verte de nuevo</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre de usuario"
            onBlur={onBlur}
            onChangeText={value => onChange(value.trim())}
            placeholder="Nombre de usuario"
            style={styles.textInput}
            value={value}
            returnKeyType="next"
          />
        )}
        name="username"
      />
      {errors.username && <Text style={styles.textError}>El nombre de usuario es requerido</Text>}

      <Controller
        control={control}
        rules={passwordRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.textInput}
            value={value}
            placeholder="Contraseña"
            secureTextEntry={isPasswordSecure}
            textContentType="password"
            returnKeyType="done"
            right={
              <TextInput.Icon
                name={() => <Feather name={isPasswordSecure ? "eye-off" : "eye"} size={20} color="grey" />}
                onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
              />
            }
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
      <View style={styles.containerButtons}>

        <Button loading={isLoggingIn} mode="contained" onPress={handleSubmit(handleLogin)}>
          {isLoggingIn ? "cargando..." : "Entrar"}
        </Button>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          ¿No tienes una cuenta? Puede crearse una:
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('SignUp')}>
          Regístrate
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  containerButtons: {
    marginTop: 20,
  },
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  container: {
    marginHorizontal: 15,
  },
  textInput: {
    marginVertical: 10,
  },
  avatar: {
    paddingTop: 50,
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
