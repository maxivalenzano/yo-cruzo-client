import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, StyleSheet, FlatList, Text, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { tripRequestActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import PendingTripCard from './PendingTripCard';
import HeaderBar from '../../Commons/HeaderBar';

const styles = StyleSheet.create({
  tripList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  const { driverTrips, loading, accepted } = useSelector((state) => state.tripRequest);

  const handleAccept = (requestId) => {
    dispatch(tripRequestActions.acceptRequest(requestId));
  };

  const handleReject = (requestId) => {
    dispatch(tripRequestActions.rejectRequest(requestId));
  };

  const onRefresh = React.useCallback(() => {
    dispatch(tripRequestActions.getAllTripRequestForDriver());
  }, [dispatch]);

  useEffect(() => {
    if (accepted) {
      dispatch(tripRequestActions.getAllTripRequestForDriver());
    }
  }, [accepted, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(tripRequestActions.getAllTripRequestForDriver());
    }, [dispatch]),
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="car-outline" size={48} color="#6B7280" />
      <Text style={styles.emptyStateText}>No hay solicitudes pendientes.</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <PendingTripCard request={item} onAccept={handleAccept} onReject={handleReject} />
  );

  return (
    <Container>
      <HeaderBar title="Mis solicitudes pendientes" onGoBack={() => navigation.goBack()} />

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
