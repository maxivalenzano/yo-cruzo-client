import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 16,
    paddingBottom: 26,
  },
  driverNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverNameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  carInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  carInfoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  carDetailsText: {
    fontSize: 14,
    color: '#989EB1',
    marginTop: 4,
  },
});

function TripDriverProfile({ trip }) {
  return (
    <View style={styles.container}>
      {/* Nombre del Conductor */}
      <View style={styles.driverNameContainer}>
        {/* <Ionicons name="person-circle" size={24} color="#333" /> */}
        <Text style={styles.driverNameText}>{`Conductor/a: ${trip?.driver?.name}`}</Text>
      </View>

      {/* Información del vehículo */}
      <View style={styles.carInfoContainer}>
        <View>
          <Text style={styles.carInfoText}>{`${trip?.car?.marca} ${trip?.car?.modelo}`}</Text>
          <Text style={styles.carDetailsText}>{`${trip?.car?.patente} - Color ${trip?.car?.color}`}</Text>
        </View>
        {/* <Ionicons name="car" style={styles.carIcon} /> */}
        <Ionicons name="person-circle" size={40} color="#000" />

      </View>
    </View>
  );
}

export default TripDriverProfile;
