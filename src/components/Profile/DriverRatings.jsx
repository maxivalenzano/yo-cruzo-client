import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ratingActions } from '../../redux/actions';
import StarRating from '../common/StarRating';
import HeaderBar from '../Commons/HeaderBar';
import Container from '../Commons/Container';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  averageRating: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 15,
  },
  ratingInfo: {
    flex: 1,
  },
  totalRatings: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewerName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  tripInfo: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  reviewComment: {
    marginTop: 8,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function DriverRatings({ driverId, navigation, driverName }) {
  const dispatch = useDispatch();
  const { loading, driverRatings } = useSelector((state) => state.rating);

  useEffect(() => {
    if (driverId) {
      dispatch(ratingActions.getDriverRatings(driverId));
    }
  }, [dispatch, driverId]);

  const renderRatingItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>
          {item.ratedBy.firstName}
          {' '}
          {item.ratedBy.lastName}
        </Text>
        <Text style={styles.reviewDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <StarRating rating={item.rating} size={16} />
      {item.trip && (
        <Text style={styles.tripInfo}>
          Viaje:
          {' '}
          {item.trip.origin.name}
          {' '}
          →
          {' '}
          {item.trip.destination.name}
          {' '}
          (
          {formatDate(item.trip.tripDate)}
          )
        </Text>
      )}
      {item.comment && (
        <Text style={styles.reviewComment}>
          &quot;
          {item.comment}
          &quot;
        </Text>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#F85F6A" />;
  }

  if (!driverRatings) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Cargando calificaciones...</Text>
      </View>
    );
  }

  return (
    <Container>
      <HeaderBar
        title={`Calificaciones de ${driverName || 'conductor'}`}
        onGoBack={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <Text style={styles.averageRating}>{driverRatings.averageRating}</Text>
          <View style={styles.ratingInfo}>
            <StarRating rating={parseFloat(driverRatings.averageRating)} size={20} />
            <Text style={styles.totalRatings}>
              {driverRatings.totalRatings}
              {' '}
              {driverRatings.totalRatings === 1 ? 'calificación' : 'calificaciones'}
            </Text>
          </View>
        </View>

        {driverRatings.ratings && driverRatings.ratings.length > 0 ? (
          <FlatList
            data={driverRatings.ratings}
            renderItem={renderRatingItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.emptyText}>Este conductor aún no tiene calificaciones.</Text>
        )}
      </View>
    </Container>
  );
}

export default DriverRatings;
