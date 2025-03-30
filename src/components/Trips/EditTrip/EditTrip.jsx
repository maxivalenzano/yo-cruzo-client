import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  LogBox,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { alertActions, carActions, tripActions } from '../../../redux/actions';
import Separator from '../../Controls/Separator';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';
import LocationInput from '../CreateTrip/LocationInput';
import { calculateDistance, calculateEstimatedPrice } from '../../../helpers/distanceHelpers';
import { validateForm } from '../CreateTrip/CreateTrip';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
  pickerInput: {
    marginLeft: -7,
    width: '50%',
  },
  textInputEmpty: {
    marginTop: 10,
    marginBottom: 5,
    color: '#D1D6DB',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  deleteButtonText: {
    color: '#989EB1',
    fontSize: 17,
  },
  mainContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  pickerWrapper: {
    marginTop: 16,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
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

  formSection: {
    marginTop: 16,
  },
  formSubSection: {
    marginTop: 8,
  },
  subSectionTitle: {
    fontSize: 14,
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

function EditTrip({ route, navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.trip.loading);
  const updated = useSelector((state) => state.trip.updated);
  const deleted = useSelector((state) => state.trip.deleted);
  const placesRefOrigin = useRef();
  const placesRefDestination = useRef();

  const getAddress = (placesRef) => placesRef?.current?.getAddressText();
  const getFormattedAddress = (address) => address?.address || address?.description || address;

  const cars = useSelector((state) => state.car.cars);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [elementMaps, setElementMaps] = useState(null);
  const [tripData, setTripData] = useState({
    car: '',
    tripDate: '',
    tripTime: '',
    origin: '',
    destination: '',
    capacity: '',
    servicesOffered: '',
    price: '',
  });

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
    dispatch(carActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (updated || deleted) {
      navigation.navigate('TripList');
      dispatch(tripActions.clean());
    }
  }, [updated, navigation, dispatch, deleted]);

  const getDistance = async (origin, destination) => {
    const data = await calculateDistance(origin, destination);
    setElementMaps(data);
  };

  useEffect(() => {
    const setAddressText = (placesRef, address) => {
      if (placesRef?.current) {
        placesRef.current.setAddressText(getFormattedAddress(address));
      }
    };
    if (route.params?.origin) {
      setAddressText(placesRefOrigin, route.params.origin);
    }
    if (route.params?.destination) {
      setAddressText(placesRefDestination, route.params.destination);
    }

    setTripData((prev) => ({
      ...prev,
      car: route.params.car.id,
      tripDate: route.params.tripDate,
      tripTime: route.params.tripDate,
      origin: route.params.origin,
      destination: route.params.destination,
      capacity: route.params.capacity,
      servicesOffered: route.params.servicesOffered,
      price: JSON.stringify(route.params.price),
    }));

    getDistance(route.params.origin, route.params.destination);
  }, [route.params]);

  const handleChange = () => {
    if (!validateForm(tripData, setErrors)) {
      return;
    }

    const hourTrip = dayjs(tripData.tripTime).hour();
    const minuteTrip = dayjs(tripData.tripTime).minute();
    const dataToSend = {
      ...tripData,
      id: route.params.id,
      tripDate: dayjs(tripData.tripDate).hour(hourTrip).minute(minuteTrip),
      publicationDate: dayjs(),
    };
    dispatch(tripActions.update(dataToSend));
  };

  const handleDeleteTrip = () => {
    dispatch(tripActions.deleteTrip(route.params.id));
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTripData((prev) => ({ ...prev, price: numericValue }));
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

  const handleLocationSelectError = (error) => {
    dispatch(alertActions.error(error?.message || error));
  };

  return (
    <Container>
      <HeaderBar title="Modifica tu viaje" onGoBack={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <Text
          style={{
            fontSize: 16,
            color: '#c2c2c2',
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          Actualiza la información de tu viaje cuando lo necesites
        </Text>
        <View style={styles.formContainer}>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View>
              <Text style={styles.labelText}>Vehículo</Text>
              <View style={styles.pickerInput}>
                <Picker
                  selectedValue={tripData.car}
                  onValueChange={(itemValue) => setTripData((p) => ({ ...p, car: itemValue }))}
                >
                  {cars?.map((c) => (
                    <Picker.Item key={c.id} label={`${c.marca} ${c.modelo}`} value={c.id} />
                  ))}
                </Picker>
                {errors.car && <Text style={styles.textError}>{errors.car}</Text>}
              </View>
              <Separator />
            </View>

            <View style={styles.datePickerWrapper}>
              <View style={styles.datePicker}>
                <View style={styles.pickerWrapper}>
                  <Text style={styles.labelText}>Fecha de viaje</Text>
                  <Pressable onPress={() => setOpenDatePicker(true)} returnKeyType="next">
                    <Text style={tripData.tripDate ? styles.textInput : styles.textInputEmpty}>
                      {tripData.tripDate
                        ? dayjs(tripData.tripDate).format('DD/MM/YYYY')
                        : '¿Qué día viajas?'}
                    </Text>
                  </Pressable>
                  {openDatePicker && (
                    <DateTimePicker
                      locale="es-ar"
                      value={new Date(tripData.tripDate)}
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
              </View>

              <View style={styles.timePicker}>
                <View style={styles.pickerWrapper}>
                  <Text style={styles.labelText}>Hora</Text>
                  <Pressable onPress={() => setOpenTimePicker(true)} returnKeyType="next">
                    <Text style={tripData.tripTime ? styles.textInput : styles.textInputEmpty}>
                      {tripData.tripTime
                        ? dayjs(tripData.tripTime).format('HH:mm')
                        : '¿A qué hora sales?'}
                    </Text>
                  </Pressable>
                  {openTimePicker && (
                    <DateTimePicker
                      locale="es-ar"
                      value={new Date(tripData.tripTime)}
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
                  <Text style={styles.labelText}>Precio: </Text>

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
              <Text style={styles.labelText}>Cantidad de asientos disponibles</Text>
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
              <Text style={styles.labelText}>Comentarios</Text>
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
              <TouchableOpacity style={styles.button} onPress={handleChange} disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Guardando cambios...' : 'Guardar cambios'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={handleDeleteTrip} disabled={loading}>
                <Text style={styles.deleteButtonText}>
                  {loading ? 'Cancelando viaje...' : 'Cancelar este viaje'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default EditTrip;
