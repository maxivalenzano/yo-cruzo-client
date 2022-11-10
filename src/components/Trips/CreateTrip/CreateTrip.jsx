/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { carActions, tripActions } from '../../../redux/actions';
import { validationConstants } from '../../../constants';
import Separator from '../../Controls/Separator';

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
  pickerInput: {
    marginLeft: -7,
    width: '50%',
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

function CreateTrip({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.trip.loading);
  const created = useSelector((state) => state.trip.created);
  const cars = useSelector((state) => state.car.cars);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [openTimePicker, setOpenTimePicker] = React.useState(false);

  useEffect(() => {
    dispatch(carActions.getAll());
  }, [dispatch, navigation]);

  useEffect(() => {
    if (created) {
      navigation.navigate('TripList');
      dispatch(tripActions.clean());
    }
  }, [created, navigation, dispatch]);

  const {
    control, handleSubmit, getValues, formState: { errors },
  } = useForm({
    defaultValues: {
      car: '',
      tripDate: '',
      tripTime: '',
      origin: '',
      destination: '',
      capacity: 1,
      servicesOffered: '',
    },
  });

  const validateIfTripTimeIsAfterNow = (tripTime) => {
    const tripDate = getValues('tripDate');
    const hourTrip = dayjs(tripTime).hour();
    const minuteTrip = dayjs(tripTime).minute();

    const tripDateTime = dayjs(tripDate).hour(hourTrip).minute(minuteTrip);
    return tripDateTime.isAfter(dayjs()) || 'Verificar la hora seleccionada';
  };

  const handleChange = async (data) => {
    const hourTrip = dayjs(data.tripTime).hour();
    const minuteTrip = dayjs(data.tripTime).minute();
    const dataToSend = {
      ...data,
      origin: data.origin.trim(),
      destination: data.destination.trim(),
      tripDate: dayjs(data.tripDate).hour(hourTrip).minute(minuteTrip),
      publicationDate: dayjs(),
    };
    dispatch(tripActions.create(dataToSend));
  };

  return (
    <View style={styles.container}>
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
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Publicar un viaje</Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Vehículo</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    style={styles.pickerInput}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    {cars?.map((car) => <Picker.Item key={car.id} label={`${car.marca} ${car.modelo}`} value={car.id} />)}
                  </Picker>
                )}
                name="car"
                rules={validationConstants.selectedCar}
              />
              <Separator />
              {errors.car && <Text style={styles.textError}>{errors.car.message}</Text>}
            </View>

            <View style={{ flex: 12 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 7 }}>
                  <View style={{ marginTop: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha de viaje</Text>
                    <View style={{ marginVertical: 2 }} />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Pressable onPress={() => setOpenDatePicker(true)} returnKeyType="next">
                            <Text style={value ? styles.textInput : styles.textInputEmpty}>
                              {value
                                ? dayjs(value).format('DD/MM/YYYY')
                                : 'Seleccionar fecha'}
                            </Text>
                          </Pressable>
                          {openDatePicker && (
                          <DateTimePicker
                            locale="es-ar"
                            value={value || new Date()}
                            minimumDate={new Date()}
                            mode="date"
                            onCancel={() => setOpenDatePicker(false)}
                            onChange={(event, selectedDate) => {
                              setOpenDatePicker(false);
                              onChange(selectedDate);
                            }}
                          />
                          )}
                        </>
                      )}
                      name="tripDate"
                      rules={validationConstants.tripDate}
                    />
                    <Separator />
                    {errors.tripDate
                     && <Text style={styles.textError}>{errors.tripDate.message}</Text>}
                  </View>
                </View>

                <View style={{ flex: 5 }}>
                  <View style={{ marginTop: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Hora</Text>
                    <View style={{ marginVertical: 2 }} />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Pressable onPress={() => setOpenTimePicker(true)} returnKeyType="next">
                            <Text style={value ? styles.textInput : styles.textInputEmpty}>
                              {value
                                ? dayjs(value).format('HH:mm')
                                : 'Seleccionar hora'}
                            </Text>
                          </Pressable>
                          {openTimePicker && (
                          <DateTimePicker
                            locale="es-ar"
                            value={value || new Date()}
                            is24Hour
                            mode="time"
                            minimumDate={new Date()}
                            onCancel={() => setOpenTimePicker(false)}
                            onChange={(event, selectedTime) => {
                              setOpenTimePicker(false);
                              onChange(selectedTime);
                            }}
                          />
                          )}
                        </>
                      )}
                      name="tripTime"
                      rules={
                        { ...validationConstants.tripTime, validate: validateIfTripTimeIsAfterNow }
                      }
                    />
                    <Separator />
                    {errors.tripTime
                      && <Text style={styles.textError}>{errors.tripTime.message}</Text>}
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Origen</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Origen"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="French 414, Resistencia"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="origin"
                rules={validationConstants.origin}
              />
              <Separator />
              {errors.origin && <Text style={styles.textError}>{errors.origin.message}</Text>}
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Destino</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Destino"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Av. 3 de Abril, Corrientes"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="destination"
                rules={validationConstants.destination}
              />
              <Separator />
              {errors.destination
              && <Text style={styles.textError}>{errors.destination.message}</Text>}
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Cantidad de asientos disponibles</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    style={styles.pickerInput}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item label="1 asiento" value={1} />
                    {[2, 3, 4]
                      .map((seat) => <Picker.Item key={seat} label={`${seat} asientos`} value={seat} />)}
                  </Picker>
                )}
                name="capacity"
                rules={validationConstants.capacity}
              />
              <Separator />
              {errors.capacity && <Text style={styles.textError}>{errors.capacity.message}</Text>}
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Comentarios</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Comentarios"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Ej. No se permiten mascotas"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="servicesOffered"
              />
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
                onPress={handleSubmit(handleChange)}
                disabled={loading}
                loading={loading}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {loading ? 'Publicando...' : 'Publicar viaje'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default CreateTrip;
