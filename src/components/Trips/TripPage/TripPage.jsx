import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, StyleSheet, FlatList, Text, Pressable, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import dayjs from 'dayjs';
import { tripActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';
import TripCard from '../../SearchTrips/SearchTripList/TripCard';
import Separator from '../../Controls/Separator';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F85F6A',
  },
  picker: {
    width: 180,
  },
  itemSeparator: {
    height: 12,
  },
});

// Componente separador para la lista
function ItemSeparatorComponent() {
  return <View style={styles.itemSeparator} />;
}

function TripPage({ navigation }) {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trip.trips);
  const loading = useSelector((state) => state.trip.loading);
  const [sortOrder, setSortOrder] = useState('recent');

  const onRefresh = useCallback(() => {
    dispatch(tripActions.getAll());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(tripActions.getAll());
    }, [dispatch]),
  );

  const sortedTrips = useMemo(() => {
    if (!trips?.length) return [];

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

  const sortData = [
    { label: 'Más reciente', value: 'recent' },
    { label: 'Más antiguo', value: 'oldest' },
  ];

  const renderTripItem = useCallback(
    ({ item }) => (
      <Pressable onPress={() => navigation.navigate('ManageTrip', item)}>
        {({ pressed }) => <TripCard trip={item} pressed={pressed} showStatus />}
      </Pressable>
    ),
    [navigation],
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="car-outline" size={48} color="#6B7280" />
      <Text style={styles.emptyStateText}>No hay viajes disponibles.</Text>
      <Text style={styles.emptyStateText}>Pulsa el botón + para crear uno nuevo.</Text>
    </View>
  );

  return (
    <Container>
      <HeaderBar
        title="Mis viajes"
        onGoBack={() => navigation.goBack()}
        rightIcon="add"
        onRightPress={() => navigation.navigate('CreateTrip')}
      />

      <View style={styles.content}>
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
                  data={sortData}
                  labelField="label"
                  valueField="value"
                  value={sortOrder}
                  onChange={(item) => setSortOrder(item.value)}
                />
              )}
            </View>
            <FlatList
              data={sortedTrips}
              renderItem={renderTripItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparatorComponent}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="#F85F6A" />
              }
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={!trips?.length ? { flex: 1 } : styles.list}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default TripPage;
