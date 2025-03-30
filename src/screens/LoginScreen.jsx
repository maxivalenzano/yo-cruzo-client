/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import userActions from '../redux/actions/user.actions';
import Separator from '../components/Controls/Separator';
import Container from '../components/Commons/Container';
import { validationConstants } from '../constants';

const styles = StyleSheet.create({
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
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 16,
    fontSize: 18,
    color: '#c2c2c2',
  },
});

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.authentication.loggingIn);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data) => {
    dispatch(userActions.login(data));
  };

  return (
    <Container>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 32 }}>
        <View style={styles.avatar}>
          <Avatar.Image
            size={150}
            source={yoCruzoLogo}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
        <View style={{ flex: 1, marginTop: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }}>
            Inicio de sesión
          </Text>

          <Text style={styles.headerText}>¡Hola! Qué bueno verte de nuevo</Text>

          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Correo electrónico</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.loginEmail}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Correo electrónico"
                    onBlur={onBlur}
                    onChangeText={(val) => onChange(val.trim())}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
                name="email"
              />
              {errors.email && (
              <Text style={styles.textError}>{errors.email.message}</Text>
              )}
              <Separator />
            </View>
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Contraseña</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.loginPassword}
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
                disabled={isLoggingIn}
                onPress={handleSubmit(handleLogin)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {isLoggingIn ? 'Iniciando sesión...' : 'Entrar'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                  ¿Aún no tienes una cuenta?
                </Text>
                <Pressable mode="text" onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      marginLeft: 4,
                    }}
                  >
                    Crear cuenta
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default LoginScreen;
