/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import { useSelector } from 'react-redux';
import Separator from '../components/Controls/Separator';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import yoCruzoLogo from '../assets/yoCruzoLogo.jpeg';
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
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function RegisterScreen({ navigation }) {
  const registration = useSelector((state) => state.authentication.registration);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const handleContinue = async (data) => {
    navigation.navigate('PersonalInfo', { userData: data });
  };

  return (
    <Container>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 32 }}>
        <View style={{ flex: 1, marginTop: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }}>Regístrate</Text>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#c2c2c2',
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              Crea tu cuenta en pocos pasos y comienza a compartir tus viajes
            </Text>
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Correo electrónico</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.registerEmail}
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
                rules={validationConstants.registerPassword}
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
                onPress={handleSubmit(handleContinue)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {registration ? 'Cargando...' : 'Continuar'}
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
                  ¿Ya tienes una cuenta?
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
    </Container>
  );
}

export default RegisterScreen;
