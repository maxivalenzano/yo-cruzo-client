import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  View, FlatList, StyleSheet, Text, Pressable, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
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
  filterBadge: {
    backgroundColor: '#FFF2F3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  filterBadgeText: {
    color: '#F85F6A',
    fontSize: 12,
    fontWeight: '500',
  },
  activeFilterBadge: {
    backgroundColor: '#F85F6A',
  },
  activeFilterBadgeText: {
    color: 'white',
  },
  filterScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

// Definimos constantes para los filtros
const FILTER_TYPES = {
  // Categorías principales
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PENDING: 'pending',
  REJECTED: 'rejected',
  ALL: 'all',
};

// Mapeo de filtros a textos de interfaz
const FILTER_TEXT = {
  [FILTER_TYPES.UPCOMING]: 'Próximos',
  [FILTER_TYPES.ACTIVE]: 'En curso',
  [FILTER_TYPES.COMPLETED]: 'Completados',
  [FILTER_TYPES.PENDING]: 'Pendientes de confirmación',
  [FILTER_TYPES.REJECTED]: 'Rechazados/Cancelados',
  [FILTER_TYPES.ALL]: 'Todos',
};

function EmptyComponent({ activeFilter }) {
  const getMessage = () => {
    switch (activeFilter) {
      case FILTER_TYPES.UPCOMING:
        return 'No tienes viajes próximos';
      case FILTER_TYPES.ACTIVE:
        return 'No tienes viajes en curso';
      case FILTER_TYPES.COMPLETED:
        return 'No tienes viajes completados';
      case FILTER_TYPES.PENDING:
        return 'No tienes solicitudes pendientes';
      case FILTER_TYPES.REJECTED:
        return 'No tienes solicitudes rechazadas o canceladas';
      default:
        return 'No tienes ningún viaje';
    }
  };

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="car-outline" size={64} color="#D2DAE2" />
      <Text style={styles.emptyText}>{getMessage()}</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={{ height: 16 }} />;
}

function PassengerTripsList({ navigation }) {
  const dispatch = useDispatch();
  const passengerTrips = useSelector((state) => state.tripRequest.trips);
  const { loading, accepted } = useSelector((state) => state.tripRequest);
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  const onRefresh = useCallback(() => {
    dispatch(tripRequestActions.getAllTripRequestForPassenger());
  }, [dispatch]);

  useEffect(() => {
    if (accepted) {
      dispatch(tripRequestActions.getAllTripRequestForPassenger());
    }
  }, [dispatch, accepted]);

  useFocusEffect(
    useCallback(() => {
      dispatch(tripRequestActions.getAllTripRequestForPassenger());
    }, [dispatch]),
  );

  // Filtros disponibles
  const availableFilters = [
    FILTER_TYPES.ALL,
    FILTER_TYPES.UPCOMING,
    FILTER_TYPES.ACTIVE,
    FILTER_TYPES.COMPLETED,
    FILTER_TYPES.PENDING,
    FILTER_TYPES.REJECTED,
  ];

  const filteredTrips = useMemo(() => {
    if (!passengerTrips || !passengerTrips.length) return [];

    // Filtrar solo las que tienen trip válido
    const validTrips = passengerTrips.filter((item) => item.trip);
    const now = dayjs();

    switch (activeFilter) {
      case FILTER_TYPES.UPCOMING:
        return validTrips.filter(
          (item) => item.status === 'ACCEPTED'
            && item.trip.status !== 'CANCELLED'
            && item.trip.status !== 'COMPLETED'
            && dayjs(item.trip.tripDate).isAfter(now),
        );
      case FILTER_TYPES.ACTIVE:
        return validTrips.filter(
          (item) => item.status === 'ACCEPTED' && item.trip.status === 'IN_PROGRESS',
        );
      case FILTER_TYPES.COMPLETED:
        return validTrips.filter(
          (item) => item.status === 'ACCEPTED' && item.trip.status === 'COMPLETED',
        );
      case FILTER_TYPES.PENDING:
        return validTrips.filter((item) => item.status === 'PENDING');
      case FILTER_TYPES.REJECTED:
        return validTrips.filter(
          (item) => ['CANCELLED', 'REJECTED', 'EXPIRED'].includes(item.status)
            || item.trip.status === 'CANCELLED',
        );
      case FILTER_TYPES.ALL:
      default:
        return validTrips;
    }
  }, [passengerTrips, activeFilter]);

  // Ordenar según la categoría
  const sortedTrips = useMemo(() => {
    // Definimos el criterio de ordenación según el filtro activo
    if (activeFilter === FILTER_TYPES.UPCOMING) {
      // Ordenar por fecha ascendente (los más cercanos primero)
      return [...filteredTrips].sort((a, b) => dayjs(a.trip.tripDate).diff(dayjs(b.trip.tripDate)));
    }
    if ([FILTER_TYPES.COMPLETED, FILTER_TYPES.REJECTED].includes(activeFilter)) {
      // Ordenar por fecha descendente (los más recientes primero)
      return [...filteredTrips].sort((a, b) => dayjs(b.trip.tripDate).diff(dayjs(a.trip.tripDate)));
    }
    // Para otras categorías
    return [...filteredTrips].sort((a, b) => {
      // Primero por estado de viaje
      const statusPriority = {
        IN_PROGRESS: 1,
        OPEN: 2,
        FULL: 3,
        COMPLETED: 4,
        CANCELLED: 5,
      };

      const statusDiff = statusPriority[a.trip.status] - statusPriority[b.trip.status];
      if (statusDiff !== 0) return statusDiff;

      // Luego por fecha
      return dayjs(a.trip.tripDate).diff(dayjs(b.trip.tripDate));
    });
  }, [filteredTrips, activeFilter]);

  const renderItem = useCallback(
    ({ item }) => {
      const currentTrip = { ...item.trip, driver: item.driver };
      return (
        <Pressable onPress={() => navigation.navigate('PassengerTripView', { item })}>
          {({ pressed }) => (
            <TripCard
              trip={currentTrip}
              pressed={pressed}
              showStatus
              showDriver
              requestStatus={item.status}
            />
          )}
        </Pressable>
      );
    },
    [navigation],
  );

  const renderFilterOptions = () => (
    <View style={styles.filterScrollView}>
      {availableFilters.map((filter) => (
        <Pressable
          key={filter}
          style={[styles.filterBadge, activeFilter === filter && styles.activeFilterBadge]}
          onPress={() => setActiveFilter(filter)}
        >
          <Text
            style={[
              styles.filterBadgeText,
              activeFilter === filter && styles.activeFilterBadgeText,
            ]}
          >
            {FILTER_TEXT[filter]}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <Container>
      <HeaderBar title="Mis viajes reservados" onGoBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#F85F6A" />
        ) : (
          <>
            {renderFilterOptions()}

            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{`${sortedTrips.length} viajes`}</Text>
            </View>

            <FlatList
              data={sortedTrips}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<EmptyComponent activeFilter={activeFilter} />}
              ItemSeparatorComponent={ItemSeparator}
              contentContainerStyle={sortedTrips.length === 0 ? { flex: 1 } : styles.list}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default PassengerTripsList;
