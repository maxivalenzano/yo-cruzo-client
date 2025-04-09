import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Container from '../Commons/Container';
import TripView from '../SearchTrips/SearchTripView/TripView';
import TripPrice from '../SearchTrips/SearchTripView/TripPrice';
import Separator from '../Controls/Separator';
import TripDriverProfile from '../SearchTrips/SearchTripView/TripDriverProfile';
import TripDriverRating from '../SearchTrips/SearchTripView/TripDriverRating';
import { dictionaryStatus } from '../SearchTrips/SearchTripList/TripCard';
import chatActions from '../../redux/actions/chat.actions';
import RatingModal from '../Modals/RatingModal';
import { tripRequestActions } from '../../redux/actions';
import HeaderBar from '../Commons/HeaderBar';
import { calculateDistance } from '../../helpers/distanceHelpers';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  statusContainer: {
    backgroundColor: '#F85F6A',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#F85F6A',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

function formatDate(date) {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

function DateDisplay({ trip }) {
  return (
    <View style={styles.dateContainer}>
      <MaterialIcons name="run-circle" size={24} color="black" />
      <Text style={styles.dateText}>{formatDate(new Date(trip.tripDate))}</Text>
    </View>
  );
}

function PassengerTripView({
  navigation,
  route: {
    params: { item: tripRequest },
  },
}) {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);
  const { cancelled, currentTripRequest, loading } = useSelector((state) => state.tripRequest);
  const [isRatingModalVisible, setRatingModalVisible] = useState(false);
  const [elementMaps, setElementMaps] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const authUser = useSelector((state) => state.authentication.user);

  const loadTripRequest = useCallback(() => {
    dispatch(tripRequestActions.getTripRequestById(tripRequest.id));
  }, [dispatch, tripRequest.id]);

  useFocusEffect(
    React.useCallback(() => {
      loadTripRequest();
    }, [loadTripRequest]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTripRequest();
  }, [loadTripRequest]);

  // Efecto para detener el estado de refreshing cuando termina la carga
  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  const trip = React.useMemo(() => {
    const requestToUse = currentTripRequest || tripRequest;
    return { ...requestToUse.trip, driver: requestToUse.driver };
  }, [currentTripRequest, tripRequest]);

  const hasCalified = React.useMemo(
    () => trip.driver.ratings.some((rating) => rating.ratedBy === authUser.id),
    [authUser.id, trip.driver.ratings],
  );

  const currentRequestStatus = currentTripRequest?.status || tripRequest.status;
  const currentStatusTrip = dictionaryStatus[trip?.status];

  // Cuando el pasajero quiere contactar al conductor
  const handleContactDriver = () => {
    dispatch(chatActions.getChatByTripRequest(tripRequest.id));
  };

  // Cuando el pasajero quiere cancelar la reserva
  const handleCancelReservation = () => {
    Alert.alert('Cancelar reserva', '¿Estás seguro que deseas cancelar esta reserva?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        onPress: () => dispatch(tripRequestActions.cancelRequest(tripRequest.id)),
        style: 'destructive',
      },
    ]);
  };

  // Cuando el pasajero quiere calificar al conductor
  const handleRateDriver = () => {
    setRatingModalVisible(true);
  };

  useEffect(() => {
    const getDistance = async () => {
      const data = await calculateDistance(trip.origin, trip.destination);
      setElementMaps(data);
    };

    getDistance();
  }, [trip]);

  // Efecto para redirigir después de cancelar reserva exitosamente
  useEffect(() => {
    if (cancelled) {
      Alert.alert('Reserva cancelada', 'La reserva ha sido cancelada exitosamente');
      navigation.goBack();
    }
  }, [cancelled, navigation]);

  // Cuando el chat está cargado, navegar a él
  useEffect(() => {
    if (activeChat) {
      navigation.navigate('DirectChat', {
        chatId: activeChat.id,
        title: trip.driver.name,
        otherUserId: trip.driver.id,
      });
    }
  }, [activeChat, dispatch, navigation, trip]);

  return (
    <Container>
      <HeaderBar title={<DateDisplay trip={trip} />} onGoBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing || loading}
            onRefresh={onRefresh}
            colors={['#F85F6A']}
            tintColor="#F85F6A"
          />
        )}
      >
        <View style={[styles.statusContainer, currentStatusTrip?.style]}>
          <Text style={styles.statusText}>{currentStatusTrip?.text}</Text>
        </View>

        <Separator />
        <TripView trip={trip} elementMaps={elementMaps} />
        <Separator />
        <TripPrice trip={trip} elementMaps={elementMaps} />
        <Separator />
        <TripDriverProfile trip={trip} />
        <Separator />
        <TripDriverRating trip={trip} />

        {currentRequestStatus === dictionaryStatus.ACCEPTED.key
          && (trip.status === dictionaryStatus.OPEN.key
            || trip.status === dictionaryStatus.FULL.key
            || trip.status === dictionaryStatus.IN_PROGRESS.key) && (
            <TouchableOpacity style={styles.actionButton} onPress={handleContactDriver}>
              <Text style={styles.actionButtonText}>Contactar al conductor</Text>
            </TouchableOpacity>
        )}

        {currentRequestStatus === dictionaryStatus.ACCEPTED.key
          && (trip.status === dictionaryStatus.OPEN.key
            || trip.status === dictionaryStatus.FULL.key) && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
              onPress={handleCancelReservation}
            >
              <Text style={styles.actionButtonText}>Cancelar reserva</Text>
            </TouchableOpacity>
        )}
        {currentRequestStatus === dictionaryStatus.ACCEPTED.key
          && trip.status === dictionaryStatus.COMPLETED.key && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: hasCalified ? '#6c757d' : '#28a745' }]}
              onPress={handleRateDriver}
              disabled={hasCalified}
            >
              <Text style={styles.actionButtonText}>{hasCalified ? 'Ya calificaste al conductor' : 'Calificar al conductor'}</Text>
            </TouchableOpacity>
        )}

        <RatingModal
          visible={isRatingModalVisible}
          tripId={trip.id}
          driverName={trip.driver.name || 'conductor'}
          onClose={() => setRatingModalVisible(false)}
          tripRequestId={tripRequest.id}
        />
      </ScrollView>
    </Container>
  );
}

export default PassengerTripView;
