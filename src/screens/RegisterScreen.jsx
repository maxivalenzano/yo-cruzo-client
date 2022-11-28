/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions';
import Separator from '../components/Controls/Separator';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
  textInputPass: {
    marginTop: 10,
    marginBottom: 5,
    width: '90%',
    // padding: 14,
    // fontSize: 22,
  },
  containerButtons: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const usernameRules = {
  required: {
    value: true,
    message: 'El nombre de usuario es requerido',
  },
  pattern: {
    value: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
    message:
      'El nombre de usuario debe empezar con una letra y solo puede contener letras, números, guiones y guiones bajos',
  },
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
  const userRegistered = useSelector((state) => state.authentication.registered);
  const registration = useSelector((state) => state.authentication.registration);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  React.useEffect(() => {
    if (userRegistered) {
      navigation.navigate('SignIn');
      dispatch(userActions.cleanUpdate());
    }
  }, [userRegistered, navigation, dispatch]);

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
    dispatch(userActions.register({ ...data, birthdate: '01/10/1996' }));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 32 }}>
        <View style={{ flex: 1, marginTop: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }}>Regístrate</Text>
          <ScrollView>
            <View style={{ marginTop: 48 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Nombre de usuario</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={usernameRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Nombre de usuario"
                    onBlur={onBlur}
                    onChangeText={(val) => onChange(val.trim())}
                    placeholder="Nombre de usuario"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                    placeholderTextColor="#D1D6DB"
                  />
                )}
                name="username"
              />
              {errors.username && <Text style={styles.textError}>{errors.username.message}</Text>}
              <Separator />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Correo electrónico</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={emailRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Correo electrónico"
                    onBlur={onBlur}
                    onChangeText={(val) => onChange(val.trim())}
                    style={styles.textInput}
                    value={value}
                    placeholder="Correo electrónico"
                    returnKeyType="next"
                  />
                )}
                name="email"
              />
              {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
              <Separator />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Contraseña</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={passwordRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Contraseña"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={styles.textInputPass}
                      value={value}
                      placeholder="Contraseña"
                      placeholderTextColor="#D1D6DB"
                      returnKeyType="next"
                      name="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      secureTextEntry={passwordVisibility}
                      enablesReturnKeyAutomatically
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                      <MaterialCommunityIcons name={rightIcon} size={22} color="#D1D6DB" />
                    </Pressable>
                  </View>
                )}
                name="password"
              />
              {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
              <Separator />
            </View>

            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                disabled={registration}
                onPress={handleSubmit(handleRegistered)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {registration ? 'registrando...' : 'Regístrate'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                  ¿Ya tiene una cuenta?
                </Text>
                <Pressable mode="text" onPress={() => navigation.navigate('SignIn')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      marginLeft: 4,
                    }}
                  >
                    Inicia sesión
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.avatar}>
              <Avatar.Image
                size={150}
                source={yoCruzoLogo}
                style={{ backgroundColor: 'transparent', opacity: 0.5 }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
