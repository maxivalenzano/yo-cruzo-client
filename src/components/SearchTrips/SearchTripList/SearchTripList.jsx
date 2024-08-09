import React, { useCallback, useMemo, useState } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import TripCard from './TripCard';
import { ItemSeparatorComponent } from '../../Cars/CarPage/CarPage';
import Separator from '../../Controls/Separator';

function formatDate(date) {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

  return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} - ${formattedTime.toLowerCase()}`;
}

function formatTitle(title) {
  if (!title?.length) {
    return title;
  }
  const firstChar = title.charAt(0).toUpperCase();
  const formattedTitle = firstChar + title.slice(1);

  return formattedTitle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
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
  list: {
    paddingHorizontal: 10,
  },
  noTripsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
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
  locationText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#F85F6A',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  picker: {
    // height: 50,
    width: 180,
  },
  // separator: { marginBottom: 8 },
});

function SearchTripList({ navigation }) {
  const trips = useSelector((state) => state.trip.trips);
  const paramsNavigation = useSelector((state) => state.trip.params);
  const loading = useSelector((state) => state.trip.loading);
  const [sortOrder, setSortOrder] = useState('recent');

  const sortedTrips = useMemo(() => {
    if (sortOrder === 'recent') {
      return [...trips].sort((a, b) => {
        const dateA = dayjs(a.tripDate);
        const dateB = dayjs(b.tripDate);
        return dateB.isAfter(dateA) ? 1 : -1;
      });
    }
    if (sortOrder === 'oldest') {
      return [...trips].sort((a, b) => {
        const dateA = dayjs(a.tripDate);
        const dateB = dayjs(b.tripDate);
        return dateA.isAfter(dateB) ? 1 : -1;
      });
    }
    return trips;
  }, [trips, sortOrder]);

  const renderItem = useCallback(({ item }) => <TripCard trip={item} />, []);

  if (!loading && (!trips || trips.length === 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTripsText}>No se encontraron viajes.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <View style={styles.locationContainer}>
            <Ionicons name="car" size={24} color="#000000" />
            <Text style={styles.locationText}>
              {formatTitle(paramsNavigation?.currentLocation)}
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(paramsNavigation?.date)}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F85F6A" />
        ) : (
          <>
            <Separator />
            <View style={styles.pickerContainer}>
              <Text style={styles.resultsText}>{`${sortedTrips?.length} resultados`}</Text>
              <Picker
                selectedValue={sortOrder}
                style={styles.picker}
                onValueChange={(itemValue) => setSortOrder(itemValue)}
              >
                <Picker.Item label="Más reciente" value="recent" />
                <Picker.Item label="Más antiguo" value="oldest" />
              </Picker>
            </View>
            <FlatList
              data={sortedTrips}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparatorComponent}
              contentContainerStyle={styles.list}
            />
          </>
        )}
      </View>
    </View>
  );
}

export default SearchTripList;
