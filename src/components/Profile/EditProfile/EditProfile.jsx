/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { userActions } from '../../../redux/actions';
import { validationConstants } from '../../../constants';
import Separator from '../../Controls/Separator';
import Container from '../../Commons/Container';

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
});

function EditProfile({ route, navigation }) {
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.user.updating);
  const updated = useSelector((state) => state.user.updated);
  const authUser = useSelector((state) => state.authentication.user);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const minValidDate = new Date(dayjs().subtract(18, 'year').format('YYYY-MM-DD'));
  const parsedDate = (date) => new Date(dayjs(date).format('YYYY-MM-DD'));

  React.useEffect(() => {
    if (updated) {
      navigation.navigate('ViewProfile');
      dispatch(userActions.cleanUpdate());
    }
  }, [updated, navigation, dispatch]);

  const initialState = {
    name: route.params?.user?.name,
    dni: route.params?.user?.dni,
    address: route.params?.user?.address,
    email: route.params?.user?.email,
    favoriteCarId: route.params?.user?.favoriteCarId,
    birthdate: route.params?.user?.birthdate
      ? parsedDate(route.params?.user?.birthdate)
      : minValidDate,
  };

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialState });

  const handleChange = async (data) => {
    const userUpdated = { ...authUser, ...data };
    dispatch(userActions.update(userUpdated));
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Editar perfil</Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Apellido y Nombre</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Apellido y Nombre"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Apellido y Nombre"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="name"
              />
              {errors.name && <Text style={styles.textError}>{errors.name.message}</Text>}
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
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
                    placeholder="DNI"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="dni"
              />
              {errors.dni && <Text style={styles.textError}>{errors.dni.message}</Text>}
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha de nacimiento</Text>
              <View style={{ marginVertical: 2 }} />

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Pressable onPress={() => setOpenDatePicker(true)} returnKeyType="next">
                      <Text style={value ? styles.textInput : styles.textInputEmpty}>
                        {value
                          ? dayjs(value).format('DD/MM/YYYY')
                          : 'Fecha de nacimiento'}
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

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Dirección</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.address}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Dirección"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Dirección"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="address"
              />
              {errors.address && <Text style={styles.textError}>{errors.address.message}</Text>}
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Email</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.email}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Email"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="email"
              />
              {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
              <Separator />
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  width: '80%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                disabled={updating}
                onPress={handleSubmit(handleChange)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {updating ? 'Guardando...' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default EditProfile;
