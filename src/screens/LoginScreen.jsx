import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Avatar, Snackbar } from 'react-native-paper';
import { setSignIn } from '../redux/slices/authSlice';
import authServices from '../services/authServices';
import { useForm, Controller } from "react-hook-form";

const passwordRules = {
  required: {
    value: true,
    message: "La contraseña es requerida",
  },
};

function LoginScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const onDismissSnackBar = () => setErrorMessage('');

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const auth = await authServices.signIn(data);
      if (Boolean(auth)) {
        dispatch(setSignIn({ ...auth, isLoggedIn: true }));
      }
    } catch (error) {
      if (error.response.status === 500) {
        setErrorMessage(
          'No se puede iniciar sesión en este momento por favor intente nuevamente mas tarde.'
        );
      } else if (error.response.status) {
        setErrorMessage(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image size={120} source={require('../assets/yoCruzoLogo.jpeg')} />
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
            secureTextEntry={true}
            returnKeyType="done"
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
      <View style={styles.containerButtons}>

        <Button loading={loading} mode="contained" onPress={handleSubmit(handleLogin)}>
          {loading ? "cargando..." : "Entrar"}
        </Button>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          ¿No tienes una cuenta? puede crearse una
        </Text>
        <Button mode="text" onPress={() => navigation.navigate('SignUp')}>
          Regístrate
        </Button>
      </View>
      <Snackbar
        visible={Boolean(errorMessage)}
        onDismiss={onDismissSnackBar}
        duration={8000}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
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
  snackbar: {
    backgroundColor: '#ff0033',
    width: '98%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '1%',
    marginRight: '1%',
    marginBottom: 0,
    padding: 0,
  },
});
