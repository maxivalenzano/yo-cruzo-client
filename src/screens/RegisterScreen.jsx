import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Avatar, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { userActions } from '../redux/actions';
import { useDispatch } from 'react-redux';

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
    marginTop: 10,
    marginBottom: 15,
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

const usernameRules = {
  required: {
    value: true,
    message: "El nombre de usuario es requerido",
  }
};

const passwordRules = {
  required: {
    value: true,
    message: 'La contraseña es requerida',
  },
  pattern: {
    value: /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    message:
      'La contraseña debe contener una mayúscula, una minúscula, un número y un caracter especial',
  },
  minLength: {
    value: 8,
    message: 'La contraseña debe contener al menos 8 caracteres',
  },
};

const emailRules = {
  required: {
    value: true,
    message: 'El correo electrónico es requerido',
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{0,3}$/i,
    message: 'Correo electrónico inválido. Formato esperado aaaa@bbb.ccc',
  },
};

function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const onDismissSnackBar = () => setErrorMessage('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  });

  const handleRegistered = async (data) => {
    dispatch(userActions.register({...data, birthdate: "01/10/1996"}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image size={120} source={require('../assets/yoCruzoLogo.jpeg')} />
      </View>
      <Controller
        control={control}
        rules={usernameRules}
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
      {errors.username && <Text style={styles.textError}>{errors.username.message}</Text>}
      <Controller
        control={control}
        rules={emailRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Correo electrónico"
            onBlur={onBlur}
            onChangeText={value => onChange(value.trim())}
            style={styles.textInput}
            value={value}
            placeholder="Correo electrónico"
            returnKeyType="next"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
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
        <Button loading={loading} mode="contained" onPress={handleSubmit(handleRegistered)}>
          {loading ? "registrando..." : "Regístrate"}
        </Button>

        <Text style={{ textAlign: 'center', marginVertical: 10 }}>¿Ya tiene una cuenta?</Text>
        <Button mode="text" onPress={() => navigation.navigate('SignIn')}>
          Inicie sesión
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

export default RegisterScreen;
