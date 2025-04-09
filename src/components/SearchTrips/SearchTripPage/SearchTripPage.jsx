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
import Container from '../../Commons/Container';
import CityButton from './CityButton';
import citiesData from './citiesData';

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
  cityButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 36,
  },
  optionsText: {
    textAlign: 'center',
  },
});

function SearchTripPage({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.trip.loading);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const placesRefDestiny = useRef();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { tripDate: '', destiny: {} } });

  const getAddress = (placesRef) => placesRef?.current?.getAddressText();

  const getLocationSelect = (details) => {
    const addressComponents = details?.address_components || [];
    const locality = addressComponents.find((component) => component.types.includes('locality'));
    return locality?.long_name || details.vicinity?.split(',')[0] || '';
  };

  const handleGetTripByCoordinates = (coordinates, cityName, includeDate = true) => {
    const tripDate = getValues('tripDate');

    const dataParams = {
      currentLocation: cityName || 'Ubicación seleccionada',
    };

    // Solo incluir la fecha si es necesario y existe
    if (includeDate && tripDate) {
      dataParams.date = dayjs(tripDate);
    }

    dispatch(tripActions.getNearbyTrips(coordinates, dataParams));
    navigation.navigate('SearchTripList');
  };

  const handleChange = (data) => {
    if (data.destiny && data.destiny.coordinates) {
      const selectedLocation = data.destiny.locality || data.destiny.vicinity;
      handleGetTripByCoordinates(data.destiny.coordinates, selectedLocation, true);
    } else {
      console.warn('No se encontraron coordenadas en el destino seleccionado');
    }
  };

  const handleCityButtonPress = (city) => {
    const cityData = citiesData[city];
    if (cityData && cityData.coordinates) {
      // Para ciudades predefinidas, no incluimos la fecha
      handleGetTripByCoordinates(cityData.coordinates, cityData.name, false);
    }
  };

  function handleLocationSelect(data, details, onChange) {
    const location = {
      coordinates: {
        lat: details?.geometry?.location?.lat,
        lng: details?.geometry?.location?.lng,
      },
      address: getAddress(placesRefDestiny),
      description: data?.description,
      vicinity: details.vicinity,
      locality: getLocationSelect(details),
    };
    if (onChange) {
      onChange(location);
    }
  }

  function handleLocationSelectError(error) {
    dispatch(alertActions.error(error.message));
  }

  return (
    <Container>
      <View style={styles.section}>
        <Text style={styles.title}>Encuentra tu viaje</Text>
        <View style={{ marginTop: 16 }}>
          <FlatList
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.flatListStyle}
            data={[{ id: 'destiny' }, { id: 'tripDate' }]}
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
                        <Controller
                          control={control}
                          name="destiny"
                          rules={validationConstants.destination}
                          render={({ field: { onChange, value } }) => (
                            <LocationInput
                              label="Ingresá tu destino"
                              value={value}
                              onChange={onChange}
                              reference={placesRefDestiny}
                              onPress={(d, details) => handleLocationSelect(d, details, onChange)}
                              onFail={handleLocationSelectError}
                              error={errors.destiny}
                            />
                          )}
                        />
                      </View>
                      <Separator />
                    </>
                  );
                case 'tripDate':
                  return (
                    <View style={{ marginTop: 8, marginBottom: 8 }}>
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
                default:
                  return null;
              }
            }}
          />

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.button}
              disabled={loading || !getValues('destiny')?.coordinates}
              onPress={handleSubmit(handleChange)}
            >
              <Ionicons name="search" size={16} color="#D1D6DB" style={{ marginRight: 4 }} />
              <Text style={styles.textButton}>{loading ? 'Buscando...' : 'Buscar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cityButtonsContainer}>
            <Text style={styles.optionsText}>ó elige una de las siguientes opciones</Text>

            <CityButton
              title="Ir a Resistencia"
              onPress={() => handleCityButtonPress('resistencia')}
              disabled={loading}
            />

            <CityButton
              title="Ir a Corrientes"
              onPress={() => handleCityButtonPress('corrientes')}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

export default SearchTripPage;
