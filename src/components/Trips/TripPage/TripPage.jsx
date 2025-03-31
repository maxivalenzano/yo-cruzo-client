import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { tripActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F5F6F8',
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#35424a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  tripList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tripItem: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#35424a',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
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
});

function TripPage({ navigation }) {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trip.trips);
  const loading = useSelector((state) => state.trip.loading);
  const [searchText, setSearchText] = React.useState('');

  const onRefresh = React.useCallback(() => {
    dispatch(tripActions.getAll());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(tripActions.getAll());
    }, [dispatch]),
  );

  const filteredTrips = React.useMemo(() => {
    if (!searchText) return trips;
    return trips.filter((trip) => {
      const destination = trip.destination?.address
      || trip.destination?.description
      || trip.destination;
      return destination.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [trips, searchText]);

  const renderTripItem = ({ item }) => {
    const destination = item.destination?.address
    || item.destination?.description
    || item.destination;
    const formattedDate = dayjs(item.tripDate).format('DD/MM/YYYY');

    return (
      <TouchableOpacity
        style={styles.tripItem}
        onPress={() => navigation.navigate('EditTrip', item)}
      >
        <Text style={styles.destinationText} numberOfLines={2}>
          {destination}
        </Text>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="car-outline" size={48} color="#6B7280" />
      <Text style={styles.emptyStateText}>
        No hay viajes disponibles.
      </Text>
      <Text style={styles.emptyStateText}>
        Pulsa el botón + para crear uno nuevo.
      </Text>
    </View>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <HeaderBar
        title="Mis viajes"
        onGoBack={() => navigation.goBack()}
        rightIcon="add"
        onRightPress={() => navigation.navigate('CreateTrip')}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar un viaje"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Trip List */}
      <FlatList
        style={styles.tripList}
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={renderTripItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="#F85F6A" />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={!filteredTrips?.length && { flex: 1 }}
      />
    </Container>
  );
}

export default TripPage;
