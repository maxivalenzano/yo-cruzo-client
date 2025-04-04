import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  View, FlatList, StyleSheet, Text, Pressable, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import dayjs from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';
import Container from '../Commons/Container';
import TripCard from '../SearchTrips/SearchTripList/TripCard';
import { tripRequestActions } from '../../redux/actions';
import HeaderBar from '../Commons/HeaderBar';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F85F6A',
  },
  picker: {
    width: 180,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

function EmptyComponent({ sortOrder }) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="car-outline" size={64} color="#D2DAE2" />
      <Text style={styles.emptyText}>
        No tienes viajes
        {' '}
        {sortOrder === 'pending' ? 'pendientes' : 'pasados'}
      </Text>
    </View>
  );
}

function PassengerTripsList({ navigation }) {
  const dispatch = useDispatch();
  const passengerTrips = useSelector((state) => state.tripRequest.trips);
  const { loading, accepted } = useSelector((state) => state.tripRequest);
  const [sortOrder, setSortOrder] = useState('pending');

  const onRefresh = React.useCallback(() => {
    dispatch(tripRequestActions.getAllTripRequestForPassenger());
  }, [dispatch]);

  useEffect(() => {
    if (accepted) {
      dispatch(tripRequestActions.getAllTripRequestForPassenger());
    }
  }, [dispatch, accepted]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(tripRequestActions.getAllTripRequestForPassenger());
    }, [dispatch]),
  );

  const sortedTrips = useMemo(() => {
    const cDate = dayjs();

    // Filtrar viajes según la selección
    let filteredTrips = [...(passengerTrips || [])];
    if (sortOrder === 'pending') {
      filteredTrips = filteredTrips.filter((item) => dayjs(item.trip.tripDate).isAfter(cDate));
    } else if (sortOrder === 'past') {
      filteredTrips = filteredTrips.filter((item) => dayjs(item.trip.tripDate).isBefore(cDate));
    }

    // Ordenar por fecha
    return filteredTrips.sort((a, b) => {
      const dateA = dayjs(a.trip.tripDate);
      const dateB = dayjs(b.trip.tripDate);
      return sortOrder === 'pending' ? dateA.diff(dateB) : dateB.diff(dateA);
    });
  }, [passengerTrips, sortOrder]);

  const data = [
    { label: 'Pendientes', value: 'pending' },
    { label: 'Pasados', value: 'past' },
    { label: 'Todos', value: 'all' },
  ];

  const renderItem = useCallback(
    ({ item }) => {
      const currentTrip = { ...item.trip, driver: item.driver, status: item.status };
      return (
        <Pressable onPress={() => navigation.navigate('PassengerTripView', { item })}>
          {({ pressed }) => <TripCard trip={currentTrip} pressed={pressed} showStatus showDriver />}
        </Pressable>
      );
    },
    [navigation],
  );

  return (
    <Container>
      <HeaderBar title="Mis Viajes Reservados" onGoBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#F85F6A" />
        ) : (
          <>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{`${sortedTrips.length} viajes`}</Text>
              <Dropdown
                style={styles.picker}
                data={data}
                labelField="label"
                valueField="value"
                value={sortOrder}
                onChange={(item) => setSortOrder(item.value)}
              />
            </View>
            <FlatList
              data={sortedTrips}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<EmptyComponent sortOrder={sortOrder} />}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              contentContainerStyle={styles.list}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default PassengerTripsList;
