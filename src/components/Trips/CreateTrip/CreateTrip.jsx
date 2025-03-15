import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { alertActions, carActions, tripActions } from '../../../redux/actions';
import Separator from '../../Controls/Separator';
import LocationInput from './LocationInput';
import Container from '../../Commons/Container';
import { calculateDistance, calculateEstimatedPrice } from '../../../helpers/distanceHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  headerIcon: {
    color: '#F85F6A',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: 16,
  },
  formSubSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subSectionTitle: {
    fontSize: 14,
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
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  pickerInput: {
    marginLeft: -7,
    width: '50%',
  },

  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  datePickerWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
  datePicker: {
    flex: 3,
  },
  timePicker: {
    flex: 2,
  },
  priceText: {
    color: '#F85F6A',
  },
  distancePriceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  currencySymbol: {
    color: '#000',
    fontSize: 16,
    marginRight: 5,
    marginLeft: 8,
  },
});

export const validateForm = (tripData, setErrors) => {
  let valid = true;
  const newErrors = {};

  if (!tripData.car) {
    valid = false;
    newErrors.car = 'Seleccionar un coche es obligatorio';
  }

  if (!tripData.tripDate) {
    valid = false;
    newErrors.tripDate = 'Seleccionar una fecha es obligatorio';
  }
  if (!tripData.tripTime) {
    valid = false;
    newErrors.tripTime = 'Seleccionar una hora es obligatorio';
  }
  if (tripData.tripTime && tripData.tripDate) {
    const hourTrip = dayjs(tripData.tripTime).hour();
    const minuteTrip = dayjs(tripData.tripTime).minute();
    const customTripDate = dayjs(tripData.tripDate).hour(hourTrip).minute(minuteTrip);
    const isValid = customTripDate.isAfter(dayjs());
    if (!isValid) {
      valid = false;
      newErrors.tripTime = 'Hora no valida';
    }
  }

  if (!tripData.destination?.coordinates) {
    valid = false;
    newErrors.destination = 'Debe seleccionar un destino';
  }

  if (!tripData.origin?.coordinates) {
    valid = false;
    newErrors.origin = 'Debe seleccionar un origen';
  }

  setErrors(newErrors);
  return valid;
};

function CreateTrip({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.trip.loading);
  const created = useSelector((state) => state.trip.created);
  const cars = useSelector((state) => state.car.cars);
  const placesRefOrigin = useRef();
  const placesRefDestination = useRef();

  const [tripData, setTripData] = useState({
    car: '',
    tripDate: null,
    tripTime: null,
    origin: {},
    destination: {},
    capacity: 3,
    servicesOffered: '',
    price: null,
  });

  const [errors, setErrors] = useState({});
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const [elementMaps, setElementMaps] = useState(null);
  const distanceKm = useMemo(
    () => ((elementMaps?.distance?.value || 0) / 1000).toFixed(1),
    [elementMaps],
  );
  const estimatedPrice = useMemo(() => {
    const price = calculateEstimatedPrice(elementMaps?.distance?.value || 0);
    const formattedPrice = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
    return formattedPrice;
  }, [elementMaps]);

  useEffect(() => {
    const getDistance = async () => {
      const data = await calculateDistance(tripData.origin, tripData.destination);
      setElementMaps(data);
    };
    if (tripData.destination.coordinates && tripData.origin.coordinates) {
      getDistance();
    }
  }, [tripData.destination, tripData.origin]);

  useEffect(() => {
    dispatch(carActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (created) {
      navigation.navigate('TripList');
      dispatch(tripActions.clean());
    }
  }, [created, navigation, dispatch]);

  const getAddress = (placesRef) => placesRef?.current?.getAddressText();

  const handleSubmit = () => {
    if (validateForm(tripData, setErrors)) {
      const hourTrip = dayjs(tripData.tripTime).hour();
      const minuteTrip = dayjs(tripData.tripTime).minute();
      const dataToSend = {
        ...tripData,
        tripDate: dayjs(tripData.tripDate).hour(hourTrip).minute(minuteTrip),
        publicationDate: dayjs(),
      };
      dispatch(tripActions.create(dataToSend));
    }
  };

  const handleLocationSelect = (data, details, field, placesRef) => {
    setTripData((prev) => ({
      ...prev,
      [field]: {
        coordinates: details?.geometry?.location,
        address: getAddress(placesRef),
        description: data?.description,
        vicinity: details.vicinity,
      },
    }));
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTripData((prev) => ({ ...prev, price: numericValue }));
  };

  const handleLocationSelectError = (error) => {
    dispatch(alertActions.error(error?.message || error));
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Publicar un viaje</Text>
        <View style={styles.formSection}>
          <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Vehículo</Text>
              <Picker
                selectedValue={tripData.car}
                onValueChange={(itemValue) => setTripData((p) => ({ ...p, car: itemValue }))}
              >
                {cars?.map((c) => (
                  <Picker.Item key={c.id} label={`${c.marca} ${c.modelo}`} value={c.id} />
                ))}
              </Picker>
              <Separator />
              {errors.car && <Text style={styles.textError}>{errors.car}</Text>}
            </View>

            <View style={styles.datePickerWrapper}>
              <View style={styles.datePicker}>
                <Text style={styles.sectionTitle}>Fecha de viaje</Text>
                <Pressable onPress={() => setOpenDatePicker(true)}>
                  <Text style={tripData.tripDate ? styles.textInput : styles.textInputEmpty}>
                    {tripData.tripDate
                      ? dayjs(tripData.tripDate).format('DD/MM/YYYY')
                      : 'Seleccionar fecha'}
                  </Text>
                </Pressable>
                {openDatePicker && (
                  <DateTimePicker
                    locale="es-ar"
                    value={tripData.tripDate || new Date()}
                    minimumDate={new Date()}
                    mode="date"
                    onChange={(event, selectedDate) => {
                      setOpenDatePicker(false);
                      setTripData((prev) => ({
                        ...prev,
                        tripDate: selectedDate,
                      }));
                    }}
                  />
                )}
                <Separator />
                {errors.tripDate && <Text style={styles.textError}>{errors.tripDate}</Text>}
              </View>

              <View style={styles.timePicker}>
                <Text style={styles.sectionTitle}>Hora</Text>
                <Pressable onPress={() => setOpenTimePicker(true)}>
                  <Text style={tripData.tripTime ? styles.textInput : styles.textInputEmpty}>
                    {tripData.tripTime
                      ? dayjs(tripData.tripTime).format('HH:mm')
                      : 'Seleccionar hora'}
                  </Text>
                </Pressable>
                {openTimePicker && (
                  <DateTimePicker
                    locale="es-ar"
                    value={tripData.tripTime || new Date()}
                    is24Hour
                    mode="time"
                    onChange={(event, selectedTime) => {
                      setOpenTimePicker(false);
                      setTripData((prev) => ({ ...prev, tripTime: selectedTime }));
                    }}
                  />
                )}
                <Separator />
                {errors.tripTime && <Text style={styles.textError}>{errors.tripTime}</Text>}
              </View>
            </View>

            <LocationInput
              withLabel
              label="Origen"
              reference={placesRefOrigin}
              onPress={(data, details) => handleLocationSelect(data, details, 'origin', placesRefOrigin)}
              onFail={handleLocationSelectError}
              error={errors.origin}
            />

            <LocationInput
              withLabel
              label="Destino"
              reference={placesRefDestination}
              onPress={(data, details) => handleLocationSelect(data, details, 'destination', placesRefDestination)}
              onFail={handleLocationSelectError}
              error={errors.destination}
            />

            {tripData.destination?.coordinates && tripData.origin?.coordinates && (
              <View style={styles.formSubSection}>
                <View style={styles.distancePriceContainer}>
                  <Text style={styles.subSectionTitle}>Distancia aproximada:</Text>
                  {!!elementMaps && (
                    <Text style={[styles.subSectionTitle, styles.priceText]}>
                      {distanceKm}
                      {' '}
                      km
                    </Text>
                  )}
                </View>
                <View style={styles.distancePriceContainer}>
                  <Text style={styles.subSectionTitle}>Precio sugerido del viaje:</Text>
                  {!!elementMaps && (
                    <Text style={[styles.subSectionTitle, styles.priceText]}>{estimatedPrice}</Text>
                  )}
                </View>

                <View style={styles.priceInputContainer}>
                  <Text style={styles.sectionTitle}>Precio: </Text>

                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    placeholder="Ingrese el precio"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={tripData.price}
                    onChangeText={handlePriceChange}
                    keyboardType="numeric"
                  />
                </View>
                {errors.price && <Text style={styles.textError}>{errors.price}</Text>}
                <Separator />
              </View>
            )}

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Cantidad de asientos disponibles</Text>
              <Picker
                selectedValue={tripData.capacity}
                style={styles.pickerInput}
                onValueChange={(itemValue) => setTripData((p) => ({ ...p, capacity: itemValue }))}
              >
                <Picker.Item label="1 asiento" value={1} />
                {[2, 3, 4].map((seat) => (
                  <Picker.Item key={seat} label={`${seat} asientos`} value={seat} />
                ))}
              </Picker>
              <Separator />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Comentarios</Text>
              <TextInput
                placeholder="Ej. No se permiten mascotas"
                placeholderTextColor="#D1D6DB"
                style={styles.textInput}
                value={tripData.servicesOffered}
                onChangeText={(text) => setTripData((prev) => ({ ...prev, servicesOffered: text }))}
              />
              <Separator />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Publicando...' : 'Publicar Viaje'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default CreateTrip;
