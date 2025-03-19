import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { tripRequestActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import PendingTripCard from './PendingTripCard';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#35424a',
  },
  tripList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconButton: {
    padding: 8,
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

function PendingTripPage({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.trip.loading);
  const driverTrips = useSelector((state) => state.tripRequest.driverTrips);
  console.log('🚀 ~ PendingTripPage ~ driverTrips:', driverTrips);

  const handleAccept = (userId, requestId) => {
    dispatch(tripRequestActions.acceptRequest(userId, requestId));
  };

  const handleReject = (requestId) => {
    dispatch(tripRequestActions.cancelRequest(requestId));
  };

  const onRefresh = React.useCallback(() => {
    dispatch(tripRequestActions.getAllTripRequestForDriver());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(tripRequestActions.getAllTripRequestForDriver());
    }, [dispatch]),
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="car-outline" size={48} color="#6B7280" />
      <Text style={styles.emptyStateText}>
        No hay solicitudes pendientes.
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <PendingTripCard
      request={item}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis solicitudes pendientes</Text>
        <View style={styles.iconButton} />
      </View>

      {/* Pending Trip List */}
      <FlatList
        data={driverTrips}
        renderItem={renderItem}
        style={styles.tripList}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="#F85F6A" />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </Container>
  );
}

export default PendingTripPage;
