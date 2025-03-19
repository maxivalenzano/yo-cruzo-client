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
  stepperText: {
    // marginLeft: 4,
    alignItems: 'flex-start',
    fontSize: 14,
    color: '#333',
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
  addressContainer: {
    textAlign: 'left',
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
});
// ["OPEN", "FULL", "CANCELLED", "COMPLETED"],
const dictionaryStatus = {
  PENDING: {
    label: 'Pendiente',
    style: styles.pending,
  },
  ACCEPTED: {
    label: 'Aceptado',
    style: styles.accepted,
  },
  REJECTED: {
    label: 'Rechazado',
    style: styles.rejected,
  },
  CANCELLED: {
    label: 'Cancelado',
    style: styles.cancelled,
  },
  OPEN: {
    label: 'Abierto',
    style: styles.open,
  },
  FULL: {
    label: 'Lleno',
    style: styles.full,
  },
  COMPLETED: {
    label: 'Completado',
    style: styles.completed,
  },
};

function TripCard({
  trip, pressed, showStatus, showDriver,
}) {
  const currentStatusTrip = dictionaryStatus[trip?.status];
  console.log('🚀 ~ trip:', trip);
  console.log('🚀 ~ currentStatusTrip:', currentStatusTrip);
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
            <View style={styles.row}>
              <IconButton icon="map-marker" size={18} />
              <View style={styles.addressContainer}>
                <Text style={styles.stepperText}>{getFormattedAddress(trip.origin).street}</Text>
                <Text style={styles.stepperText}>{getFormattedAddress(trip.origin).city}</Text>
              </View>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.row}>
              <IconButton icon="flag-checkered" size={18} />
              <View style={styles.addressContainer}>
                <Text style={styles.stepperText}>
                  {getFormattedAddress(trip.destination).street}
                </Text>
                <Text style={styles.stepperText}>{getFormattedAddress(trip.destination).city}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {showDriver && (
        <View style={styles.driver}>
          <IconButton icon="account" size={20} />
          <Text style={styles.text}>{trip.driver?.name}</Text>
        </View>
      )}
    </Card>
  );
}

export default TripCard;
