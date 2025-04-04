import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverInfoContainer: {
    flex: 1,
  },
  driverNameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  carInfoText: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  carDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carDetailsText: {
    fontSize: 14,
    color: '#989EB1',
  },
  commentSection: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#989EB1',
    flex: 1,
  },
});

function TripDriverProfile({ trip }) {
  const servicesOffered = trip?.servicesOffered || 'Sin comentarios o preferencias';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.driverInfoContainer}>
          <Text style={styles.driverNameText}>{`Conductor/a: ${trip?.driver?.name}`}</Text>
          <Text style={styles.carInfoText}>{`${trip?.car?.marca} ${trip?.car?.modelo}`}</Text>

          <View style={styles.carDetailsContainer}>
            <Text style={styles.carDetailsText}>{`${trip?.car?.patente} - Color ${trip?.car?.color}`}</Text>
          </View>
        </View>

        <Ionicons name="person-circle" size={40} color="#000" />
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.commentLabel}>Comentarios:</Text>
        <Text style={styles.commentText} numberOfLines={2}>{servicesOffered}</Text>
      </View>
    </View>
  );
}

export default TripDriverProfile;
