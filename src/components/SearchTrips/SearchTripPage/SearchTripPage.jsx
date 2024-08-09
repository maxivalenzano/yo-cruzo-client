/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { alertActions, tripActions } from '../../../redux/actions';
import Separator from '../../Controls/Separator';
import LocationInput from '../../Trips/CreateTrip/LocationInput';
import { validationConstants } from '../../../constants';
import DatePicker from '../../Controls/DatePicker';
import TimePicker from '../../Controls/TimePicker';
import Container from '../../Commons/Container';

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'black',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  buttonTrip: {
    marginTop: 20,
    backgroundColor: '#f85f6a',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  containerButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  flatListStyle: {
    marginVertical: 4,
    paddingBotton: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textButton: { color: 'white', fontSize: 17, fontWeight: 'bold' },
});

function SearchTripPage({ navigation }) {
  const dispatch = useDispatch();
  // const updating = useSelector((state) => state.user.updating);
  // const authUser = useSelector((state) => state.authentication.user);
  // const trips = useSelector((state) => state.trip.trips);
  const loading = useSelector((state) => state.trip.loading);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const placesRefDestiny = useRef();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { tripDate: '', tripTime: '', destiny: {} } });

  const getAddress = (placesRef) => placesRef?.current?.getAddressText();

  const getLocationSelect = (details) => {
    const addressComponents = details?.address_components || [];
    const locality = addressComponents.find((component) => component.types.includes('locality'));
    return locality?.long_name || details.vicinity?.split(',')[0] || '';
  };

  const handleGetTrip = (location) => {
    const tripTime = getValues('tripTime') || new Date();
    const tripDate = getValues('tripDate') || new Date();
    const hourTrip = dayjs(tripTime).hour();
    const minuteTrip = dayjs(tripTime).minute();

    const tripDateTime = dayjs(tripDate).hour(hourTrip).minute(minuteTrip);
    const dataParams = {
      date: tripDateTime,
      currentLocation: location || '',
    };
    dispatch(tripActions.getTripByCity(location, dataParams));
    navigation.navigate('ListTripNavigator', dataParams);
  };
  const handleChange = (data) => {
    handleGetTrip(data.destiny.locality);
  };

  const validateIfTripTimeIsAfterNow = (tripTime) => {
    if (!tripTime) {
      return false;
    }
    const tripDate = getValues('tripDate');
    const hourTrip = dayjs(tripTime).hour();
    const minuteTrip = dayjs(tripTime).minute();

    const tripDateTime = dayjs(tripDate).hour(hourTrip).minute(minuteTrip);
    return tripDateTime.isAfter(dayjs()) || 'Verificar la hora seleccionada';
  };

  function handleLocationSelect(data, details, onChange) {
    const location = {
      coordinates: details?.geometry?.location,
      address: getAddress(placesRefDestiny),
      description: data?.description,
      formattedAddress: details?.formatted_address,
      locality: getLocationSelect(details),
    };
    onChange(location);
  }

  function handleLocationSelectError(error) {
    dispatch(alertActions.error(error));
  }

  return (
    <Container>
      <View style={styles.section}>
        <Text style={styles.title}>Encuentra tu viaje</Text>
        <View style={{ marginTop: 16 }}>
          <FlatList
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.flatListStyle}
            data={[{ id: 'destiny' }, { id: 'tripDate' }, { id: 'tripTime' }]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              switch (item.id) {
                case 'destiny':
                  return (
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                          name="location-sharp"
                          size={20}
                          color="#D1D6DB"
                          style={{ marginRight: 10 }}
                        />
                        <LocationInput
                          control={control}
                          name="destiny"
                          label="Ingresá tu destino"
                          rules={validationConstants.destination}
                          reference={placesRefDestiny}
                          onPress={handleLocationSelect}
                          onFail={handleLocationSelectError}
                          error={errors.destiny}
                        />
                      </View>
                      <Separator />
                    </>
                  );
                case 'tripDate':
                  return (
                    <View style={{ marginTop: 8 }}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <DatePicker
                            value={value}
                            onChange={onChange}
                            open={openDatePicker}
                            setOpen={setOpenDatePicker}
                          />
                        )}
                        name="tripDate"
                      />
                      <Separator />
                      {errors.tripDate && (
                      <Text style={styles.textError}>
                        {errors.tripDate.message}
                      </Text>
                      )}
                    </View>
                  );
                case 'tripTime':
                  return (
                    <View style={{ marginTop: 8, marginBottom: 8 }}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TimePicker
                            value={value}
                            onChange={onChange}
                            open={openTimePicker}
                            setOpen={setOpenTimePicker}
                          />
                        )}
                        name="tripTime"
                        rules={{ validate: validateIfTripTimeIsAfterNow }}
                      />
                      {errors.tripTime && (
                      <Text style={styles.textError}>
                        {errors.tripTime.message}
                      </Text>
                      )}
                    </View>
                  );
                default:
                  return null;
              }
            }}
          />

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleSubmit(handleChange)}
            >
              <Ionicons name="search" size={16} color="#D1D6DB" style={{ marginRight: 4 }} />
              <Text style={styles.textButton}>{loading ? 'Buscando...' : 'Buscar'}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F5FCFF',
              marginVertical: 10,
              marginTop: 36,
            }}
          >
            <Text style={{ textAlign: 'center' }}>ó elige una de las siguientes opciones</Text>

            <TouchableOpacity
              style={styles.buttonTrip}
              onPress={() => handleGetTrip('resistencia')}
              disabled={loading}
            >
              <Text style={styles.textButton}>Ir a Resistencia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTrip}
              onPress={() => handleGetTrip('corrientes')}
              disabled={loading}
            >
              <Text style={styles.textButton}>Ir a Corrientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}

export default SearchTripPage;
