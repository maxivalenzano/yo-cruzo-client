import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 16,
    paddingBottom: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  subText: {
    fontSize: 14,
    color: '#989EB1',
    marginTop: 4,
  },
});

function DriverRating({ trip }) {
  // const driverName = trip?.driver?.name || 'Conductor';
  const rating = trip?.driver?.rating || 0; // Calificación de 0 a 5
  const servicesOffered = trip?.servicesOffered || 'Sin comentarios o preferencias';

  return (
    <View style={styles.container}>
      {/* Calificación del conductor */}
      <View style={styles.row}>
        <Text style={styles.labelText}>Calificación</Text>
        <AirbnbRating
          defaultRating={rating}
          isDisabled
          size={16}
          showRating={false}
          starContainerStyle={styles.ratingText}
        />
      </View>

      <Text style={styles.subText}>Comentarios:</Text>
      <Text style={styles.subText}>{servicesOffered}</Text>
    </View>
  );
}

export default DriverRating;
