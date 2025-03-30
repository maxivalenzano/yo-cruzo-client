// PassengerTripView.js
import React, { useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Container from '../Commons/Container';
import TripView from '../SearchTrips/SearchTripView/TripView';
import TripPrice from '../SearchTrips/SearchTripView/TripPrice';
import Separator from '../Controls/Separator';
import TripDriverProfile from '../SearchTrips/SearchTripView/TripDriverProfile';
import TripDriverRating from '../SearchTrips/SearchTripView/TripDriverRating';
import { dictionaryStatus } from '../SearchTrips/SearchTripList/TripCard';
import chatActions from '../../redux/actions/chat.actions';

const styles = StyleSheet.create({
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
    marginBottom: 16,
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

function PassengerTripView({
  navigation,
  route: {
    params: { item },
  },
}) {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);
  const trip = React.useMemo(
    () => ({ ...item.trip, driver: item.driver }),
    [item.trip, item.driver],
  );
  const currentStatusTrip = dictionaryStatus[trip?.status];

  // Cuando el pasajero quiere contactar al conductor
  const handleContactDriver = () => {
    dispatch(chatActions.getChatByTripRequest(item.id));
  };

  // Cuando el chat está cargado, navegar a él
  useEffect(() => {
    if (activeChat) {
      navigation.navigate('DirectChat', {
        chatId: activeChat.id,
        title: trip.driver.name,
        otherUserId: trip.driver.id,
      });
      // Limpiar el chat activo para futuras navegaciones
      setTimeout(() => {
        dispatch(chatActions.clearActiveChat());
      }, 500);
    }
  }, [activeChat, dispatch, navigation, trip]);

  return (
    <Container>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.statusContainer, currentStatusTrip?.style]}>
          <Text style={styles.statusText}>{currentStatusTrip?.text}</Text>
        </View>

        <View style={styles.dateContainer}>
          <MaterialIcons name="run-circle" size={24} color="black" />
          <Text style={styles.dateText}>{formatDate(new Date(trip.tripDate))}</Text>
        </View>

        <Separator />
        <TripView trip={trip} />
        <Separator />
        <TripPrice trip={trip} />
        <Separator />
        <TripDriverProfile trip={trip} />
        <Separator />
        <TripDriverRating trip={trip} />

        {(trip.status === dictionaryStatus.ACCEPTED.key
          || item.status === dictionaryStatus.ACCEPTED.key) && (
          <>
            <TouchableOpacity style={styles.actionButton} onPress={handleContactDriver}>
              <Text style={styles.actionButtonText}>Contactar al conductor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
              onPress={() => {
                /* Implementar cancelación */
              }}
            >
              <Text style={styles.actionButtonText}>Cancelar reserva</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Container>
  );
}

export default PassengerTripView;
