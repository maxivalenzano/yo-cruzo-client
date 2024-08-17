import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Container from '../../Commons/Container';
import TripView from './TripView';
import TripPrice from './TripPrice';
import Separator from '../../Controls/Separator';

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
});

function SearchTripView({
  navigation,
  route: {
    params: { item },
  },
}) {
  const [elementMaps, setElementMaps] = useState(null);

  useEffect(() => {
    const calculateDistance = async () => {
      const apiKey = 'AIzaSyCDdOit0z643cb7uDBVZgKmKNKRQ3W6OiQ';
      const origin = `${item.origin.coordinates.lat},${item.origin.coordinates.lng}`;
      const destination = `${item.destination.coordinates.lat},${item.destination.coordinates.lng}`;

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        const result = response.data;
        const dataMatrix = result.rows[0].elements[0];
        setElementMaps(dataMatrix);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    calculateDistance();
  }, [item]);

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
          <TripView trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripPrice trip={item} elementMaps={elementMaps} />
          <Separator />
        </View>
      </View>
    </Container>
  );
}

export default SearchTripView;
