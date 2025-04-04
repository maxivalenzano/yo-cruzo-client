import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarRating from '../../common/StarRating';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  ratingCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingCount: {
    color: '#666',
    fontSize: 12,
  },
  moreButton: {
    marginLeft: 8,
  },
  moreButtonText: {
    color: '#F85F6A',
    fontWeight: 'bold',
    fontSize: 12,
  },
  noRating: {
    fontStyle: 'italic',
    color: '#666',
  },
});

function TripDriverRating({ trip }) {
  const navigation = useNavigation();

  // Si no hay conductor o no tiene ratings, mostrar mensaje
  if (!trip?.driver || !trip.driver.averageRating) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calificación del conductor</Text>
        <Text style={styles.noRating}>Este conductor aún no tiene calificaciones</Text>
      </View>
    );
  }

  const averageRating = parseFloat(trip.driver.averageRating) || 0;
  const totalRatings = trip.driver.ratings?.length || 0;

  const handleViewRatings = () => {
    navigation.navigate('DriverRatings', {
      driverId: trip.driver.id,
      driverName: trip.driver.name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificación del conductor</Text>
      <View style={styles.ratingContainer}>
        <StarRating rating={averageRating} size={20} />
        <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
      </View>
      <View style={styles.ratingCountContainer}>
        <Text style={styles.ratingCount}>
          {totalRatings}
          {' '}
          {totalRatings === 1 ? 'calificación' : 'calificaciones'}
        </Text>
        {totalRatings > 0 && (
          <TouchableOpacity style={styles.moreButton} onPress={handleViewRatings}>
            <Text style={styles.moreButtonText}>Ver todas las calificaciones</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default TripDriverRating;
