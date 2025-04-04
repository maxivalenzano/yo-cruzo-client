import React, { useCallback, useMemo, useState } from 'react';
import {
  View, FlatList, StyleSheet, Text, Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import dayjs from 'dayjs';
import { Dropdown } from 'react-native-element-dropdown';
import TripCard from './TripCard';
import { ItemSeparatorComponent } from '../../Cars/CarPage/CarPage';
import Separator from '../../Controls/Separator';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';

function formatDate(date) {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

  return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
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
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 10,
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
  infoHeader: {
  },
  dateText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
    color: '#555',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F85F6A',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  picker: {
    width: 180,
  },
});

function LocationDisplay({ currentLocation }) {
  return (
    <View style={styles.locationContainer}>
      <Ionicons name="car" size={24} color="#000000" />
      <Text style={styles.locationText}>
        {formatTitle(currentLocation)}
      </Text>
    </View>
  );
}

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

  const data = [
    { label: 'Más reciente', value: 'recent' },
    { label: 'Más antiguo', value: 'oldest' },
  ];

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable onPress={() => navigation.navigate('SearchTripView', { item })}>
        {({ pressed }) => <TripCard trip={item} pressed={pressed} showDriver showStatus />}
      </Pressable>
    ),
    [navigation],
  );

  return (
    <Container>
      <HeaderBar
        title={<LocationDisplay currentLocation={paramsNavigation?.currentLocation} />}
        onGoBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <View style={styles.infoHeader}>
          <Text style={styles.dateText}>{formatDate(paramsNavigation?.date)}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#F85F6A" />
        ) : (
          <>
            <Separator />
            <View style={styles.pickerContainer}>
              <Text style={styles.resultsText}>{`${sortedTrips?.length} resultados`}</Text>
              {!!trips?.length && (
                <Dropdown
                  style={styles.picker}
                  data={data}
                  labelField="label"
                  valueField="value"
                  value={sortOrder}
                  onChange={(item) => setSortOrder(item.value)}
                />
              )}
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
    </Container>
  );
}

export default SearchTripList;
