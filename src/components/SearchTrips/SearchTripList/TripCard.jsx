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
});

function TripCard({ trip, pressed }) {
  return (
    <Card style={[styles.card, pressed && styles.pressedCard]}>
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
      <View style={styles.driver}>
        <IconButton icon="account" size={20} />
        <Text style={styles.text}>{trip.driver?.name}</Text>
      </View>
    </Card>
  );
}

export default TripCard;
