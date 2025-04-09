/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { alertActions, tripActions } from '../../../redux/actions';
import Separator from '../../Controls/Separator';
import LocationInput from '../../Trips/CreateTrip/LocationInput';
import DatePicker from '../../Controls/DatePicker';
import Container from '../../Commons/Container';
import CityButton from './CityButton';
import citiesData from './citiesData';

const styles = StyleSheet.create({
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
  const [destiny, setDestiny] = useState(null);
  const [tripDate, setTripDate] = useState('');
  const [destinyError, setDestinyError] = useState(null);
  const placesRefDestiny = useRef();

  const getAddress = (placesRef) => placesRef?.current?.getAddressText();

  const getLocationSelect = (details) => {
    const addressComponents = details?.address_components || [];
    const locality = addressComponents.find((component) => component.types.includes('locality'));
    return locality?.long_name || details.vicinity?.split(',')[0] || '';
  };

  const handleGetTripByCoordinates = (coordinates, cityName, includeDate = true) => {
    const dataParams = {
      currentLocation: cityName || 'Ubicación seleccionada',
    };

    if (includeDate && tripDate) {
      dataParams.date = dayjs(tripDate);
    }

    dispatch(tripActions.getNearbyTrips(coordinates, dataParams));
    navigation.navigate('SearchTripList');
  };

  const handleSearch = () => {
    if (!destiny || !destiny.coordinates) {
      setDestinyError('Debes seleccionar un destino');
      return;
    }

    const selectedLocation = destiny.locality || destiny.vicinity;
    handleGetTripByCoordinates(destiny.coordinates, selectedLocation, true);
  };

  const handleCityButtonPress = (city) => {
    const cityData = citiesData[city];
    if (cityData && cityData.coordinates) {
      // Para ciudades predefinidas, no incluimos la fecha
      handleGetTripByCoordinates(cityData.coordinates, cityData.name, false);
    }
  };

  const handleLocationSelect = (data, details, onChange) => {
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

    setDestiny(location);
    setDestinyError(null);

    if (onChange) {
      onChange(location);
    }
  };

  const handleLocationSelectError = (error) => {
    dispatch(alertActions.error(error.message));
  };

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
                        <LocationInput
                          label="Ingresá tu destino"
                          value={destiny}
                          onChange={setDestiny}
                          reference={placesRefDestiny}
                          onPress={(d, details) => handleLocationSelect(d, details)}
                          onFail={handleLocationSelectError}
                          error={destinyError}
                        />
                      </View>
                      <Separator />
                    </>
                  );
                case 'tripDate':
                  return (
                    <View style={{ marginTop: 8, marginBottom: 12 }}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        open={openDatePicker}
                        setOpen={setOpenDatePicker}
                      />
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
              onPress={handleSearch}
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
