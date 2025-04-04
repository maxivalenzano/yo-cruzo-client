import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import dayjs from 'dayjs';
import { getFormattedAddress } from '../../../helpers/locationHelpers';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    backgroundColor: '#FBFBFC',
  },
  pressedCard: {
    backgroundColor: '#E3E3E3',
    opacity: 0.85,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
  leftColumn: {
    flex: 0.35, // 40% del espacio
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 0.65, // 60% del espacio
    justifyContent: 'center',
  },
  stepperContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepLine: {
    width: 3,
    height: 20,
    backgroundColor: '#F85F6A',
    marginLeft: 21,
  },
  driver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
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
  inProgress: {
    backgroundColor: '#3498DB',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'nowrap',
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 6,
  },
});

export const dictionaryStatus = {
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
    label: 'Cancelado',
    style: styles.cancelled,
  },
  REJECTED: {
    key: 'REJECTED',
    text: 'Viaje rechazado',
    label: 'Rechazado',
    style: styles.rejected,
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
  EXPIRED: {
    key: 'EXPIRED',
    text: 'Viaje expirado',
    label: 'Expirado',
    style: styles.cancelled,
  },
  IN_PROGRESS: {
    key: 'IN_PROGRESS',
    text: 'Viaje en curso',
    label: 'En curso',
    style: styles.inProgress,
  },
};

function TripCard({
  trip, pressed, showStatus, showDriver,
}) {
  const currentStatusTrip = dictionaryStatus[trip?.status];
  return (
    <Card style={[styles.card, pressed && styles.pressedCard]}>
      {showStatus && (
        <View style={[styles.statusContainer, currentStatusTrip?.style]}>
          <Text style={styles.statusText}>{currentStatusTrip?.label}</Text>
        </View>
      )}
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <IconButton icon="calendar" size={18} />
            <View>
              <Text style={styles.text}>{dayjs(trip.tripDate).format('DD MMM YY')}</Text>
              <Text style={styles.text}>{dayjs(trip.tripDate).format('HH:mm [hs]')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.stepperContainer}>
            <View style={styles.locationContainer}>
              <IconButton icon="map-marker" size={18} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                  {getFormattedAddress(trip.origin).street}
                </Text>
                <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                  {getFormattedAddress(trip.origin).city}
                </Text>
              </View>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.locationContainer}>
              <IconButton icon="flag-checkered" size={18} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                  {getFormattedAddress(trip.destination).street}
                </Text>
                <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                  {getFormattedAddress(trip.destination).city}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {showDriver && (
        <View style={styles.driver}>
          <IconButton icon="account" size={20} />
          <Text style={styles.text}>{trip.driver?.name || trip.driver?.email}</Text>
        </View>
      )}
    </Card>
  );
}

export default TripCard;
