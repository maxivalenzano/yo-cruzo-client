/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { userActions } from '../redux/actions';
import { validationConstants } from '../constants';
import Separator from '../components/Controls/Separator';
import Container from '../components/Commons/Container';

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
  textInputEmpty: {
    marginTop: 10,
    marginBottom: 5,
    color: '#D1D6DB',
  },
  containerButtons: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function PersonalInfoScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { registration, registered } = useSelector((state) => state.authentication);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const { userData } = route.params;

  useEffect(() => {
    if (registered) {
      navigation.navigate('SignIn');
    }
  }, [registered, navigation]);

  const minValidDate = new Date(dayjs().subtract(18, 'year').format('YYYY-MM-DD'));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      birthdate: minValidDate,
      address: '',
    },
  });

  const handleRegistration = async (personalData) => {
    const completeUserData = {
      ...userData,
      ...personalData,
    };

    dispatch(userActions.register(completeUserData));
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 32 }}>
        <View style={{ flex: 1, marginTop: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 1.1 }}>
            Información Personal
          </Text>
          <Text style={{ fontSize: 16, color: '#c2c2c2', marginTop: 8 }}>
            Completa tus datos para finalizar el registro
          </Text>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ marginTop: 48 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Nombre</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.firstName}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Nombre"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Nombre"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                    placeholderTextColor="#D1D6DB"
                  />
                )}
                name="firstName"
              />
              {errors.firstName && <Text style={styles.textError}>{errors.firstName.message}</Text>}
              <Separator />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Apellido</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.lastName}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Apellido"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Apellido"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                    placeholderTextColor="#D1D6DB"
                  />
                )}
                name="lastName"
              />
              {errors.lastName && <Text style={styles.textError}>{errors.lastName.message}</Text>}
              <Separator />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>DNI</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.dni}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="DNI"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={styles.textInput}
                    value={value}
                    placeholder="DNI"
                    returnKeyType="next"
                    placeholderTextColor="#D1D6DB"
                  />
                )}
                name="dni"
              />
              {errors.dni && <Text style={styles.textError}>{errors.dni.message}</Text>}
              <Separator />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha de nacimiento</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Pressable onPress={() => setOpenDatePicker(true)} returnKeyType="next">
                      <Text style={value ? styles.textInput : styles.textInputEmpty}>
                        {value ? dayjs(value).format('DD/MM/YYYY') : 'Fecha de nacimiento'}
                      </Text>
                    </Pressable>
                    {openDatePicker && (
                      <DateTimePicker
                        locale="es-ar"
                        value={value || minValidDate}
                        mode="date"
                        onCancel={() => setOpenDatePicker(false)}
                        maximumDate={minValidDate}
                        onChange={(event, selectedDate) => {
                          setOpenDatePicker(false);
                          onChange(selectedDate);
                        }}
                      />
                    )}
                  </>
                )}
                name="birthdate"
                rules={validationConstants.birthdate}
              />
              {errors.birthdate && <Text style={styles.textError}>{errors.birthdate.message}</Text>}
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
                onPress={handleSubmit(handleRegistration)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {registration ? 'Registrando...' : 'Completar registro'}
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
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default PersonalInfoScreen;
