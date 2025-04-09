import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, StyleSheet, FlatList, Text, Pressable, RefreshControl, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { tripActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';
import TripCard from '../../SearchTrips/SearchTripList/TripCard';
import Separator from '../../Controls/Separator';
import SortButton from '../../Controls/SortButton';
import {
  sortTrips,
  getSortOrderText,
  SORT_OPTIONS,
  CANCEL_INDEX,
  SORT_TITLE,
  SORT_TYPES,
} from '../../../helpers/tripSortHelper';

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
  const [sortOrder, setSortOrder] = useState(SORT_TYPES.DISTANCE);
  const { showActionSheetWithOptions } = useActionSheet();

  const onRefresh = useCallback(() => {
    dispatch(tripActions.getAll());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(tripActions.getAll());
    }, [dispatch]),
  );

  const showSortOptions = () => {
    showActionSheetWithOptions(
      {
        options: SORT_OPTIONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: SORT_TITLE,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) setSortOrder(SORT_TYPES.DISTANCE);
        else if (buttonIndex === 1) setSortOrder(SORT_TYPES.RECENT);
        else if (buttonIndex === 2) setSortOrder(SORT_TYPES.OLDEST);
      },
    );
  };

  const sortedTrips = sortTrips(trips, sortOrder);

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
                <SortButton
                  currentSortText={getSortOrderText(sortOrder)}
                  onPress={showSortOptions}
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
