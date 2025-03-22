// PassengerTripView.js
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Container from '../Commons/Container';
import TripView from '../SearchTrips/SearchTripView/TripView';
import TripPrice from '../SearchTrips/SearchTripView/TripPrice';
import Separator from '../Controls/Separator';
import TripDriverProfile from '../SearchTrips/SearchTripView/TripDriverProfile';
import TripDriverRating from '../SearchTrips/SearchTripView/TripDriverRating';

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
  pending: {
    backgroundColor: '#FFA726',
  },
  accepted: {
    backgroundColor: '#66BB6A',
  },
  rejected: {
    backgroundColor: '#EF5350',
  },
  cancelled: {
    backgroundColor: '#BDBDBD',
  },
  open: {
    backgroundColor: '#42A5F5',
  },
  full: {
    backgroundColor: '#AB47BC',
  },
  completed: {
    backgroundColor: '#8D6E63',
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

const dictionaryStatus = {
  PENDING: {
    key: 'PENDING',
    text: 'Pendiente de aprobación',
    label: 'Pendiente',
    style: styles.pending,
  },
  ACCEPTED: {
    key: 'ACCEPTED',
    text: 'Viaje confirmado',
    label: 'Aceptado',
    style: styles.accepted,
  },
  CANCELLED: {
    key: 'CANCELLED',
    text: 'Viaje cancelado',
    label: 'Rechazado',
    style: styles.rejected,
  },
  REJECTED: {
    key: 'REJECTED',
    text: 'Viaje rechazado',
    label: 'Cancelado',
    style: styles.cancelled,
  },
  OPEN: {
    key: 'OPEN',
    text: 'Viaje abierto',
    label: 'Abierto',
    style: styles.open,
  },
  FULL: {
    key: 'FULL',
    text: 'Viaje lleno',
    label: 'Lleno',
    style: styles.full,
  },
  COMPLETED: {
    key: 'COMPLETED',
    text: 'Viaje completado',
    label: 'Completado',
    style: styles.completed,
  },
};

function PassengerTripView({
  navigation,
  route: {
    params: { item },
  },
}) {
  const trip = { ...item.trip, driver: item.driver, status: item.status };
  const currentStatusTrip = dictionaryStatus[trip?.status];
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

        {trip.status === dictionaryStatus.ACCEPTED.key && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                /* Implementar chat con conductor */
              }}
            >
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
