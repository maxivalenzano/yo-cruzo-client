import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Container from '../../Commons/Container';
import TripView from './TripView';
import TripPrice from './TripPrice';
import Separator from '../../Controls/Separator';
import { calculateDistance } from '../../../helpers/distanceHelpers';
import TripDriverProfile from './TripDriverProfile';
import TripDriverRating from './TripDriverRating';

function formatDate(date) {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

  // Capitalize the first letter of the formatted date
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return capitalizedDate;
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F85F6A',
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
});

function SearchTripView({
  navigation,
  route: {
    params: { item },
  },
}) {
  const [elementMaps, setElementMaps] = useState(null);
  // const loading = useSelector((state) => state.trip.loading);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDistance = async () => {
      const data = await calculateDistance(item.origin, item.destination);
      setElementMaps(data);
    };

    getDistance();
  }, [item.destination, item.origin]);

  const handleContinueTrip = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Container>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="run-circle" size={24} color="black" />
            <Text style={styles.dateText}>{formatDate(new Date(item.tripDate))}</Text>
          </View>
        </View>
        <View>
          <Separator />
          <TripView trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripPrice trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripDriverProfile trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripDriverRating trip={item} elementMaps={elementMaps} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContinueTrip} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Confirmando...' : 'Confirmar Viaje'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

export default SearchTripView;
