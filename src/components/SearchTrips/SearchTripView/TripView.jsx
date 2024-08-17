import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import dayjs from 'dayjs';
import { getFormattedAddress } from '../../../helpers/locationHelpers';

const styles = StyleSheet.create({
  content: {
    padding: 10,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center ',
    justifyContent: 'flex-start',
  },
  textContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: 120,
  },
  text: {
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
  },
  leftColumn: {
    flex: 0.30,
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 0.70,
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
  addressContainer: {
    textAlign: 'left',
  },
});

function TripView({ trip, elementMaps }) {
  const tripDateFinish = useMemo(() => {
    const tripDate = dayjs(trip.tripDate);
    if (!elementMaps?.duration) {
      return tripDate;
    }
    const durationInMinutes = elementMaps?.duration?.value;
    const newTripDate = tripDate.add(durationInMinutes, 'seconds');

    return newTripDate;
  }, [trip.tripDate, elementMaps]);

  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.text}>Salida</Text>
                <Text style={styles.text}>{dayjs(trip.tripDate).format('HH:mm [hs]')}</Text>
              </View>
              <View>
                <Text style={styles.text}>Llegada</Text>
                <Text style={styles.text}>{dayjs(tripDateFinish).format('HH:mm [hs]')}</Text>
              </View>
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
    </View>
  );
}

export default TripView;
