import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { dictionaryStatus } from '../../SearchTrips/SearchTripList/TripCard';
import Container from '../../Commons/Container';
import Separator from '../../Controls/Separator';
import TripView from '../../SearchTrips/SearchTripView/TripView';
import TripPrice from '../../SearchTrips/SearchTripView/TripPrice';
import PassengersList from './PassengersList';
import { APP_THEME } from '../../../config';
import { tripActions } from '../../../redux/actions';
import HeaderBar from '../../Commons/HeaderBar';
import { calculateDistance } from '../../../helpers/distanceHelpers';

const styles = StyleSheet.create({
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
  },
  dateText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: APP_THEME.successColor,
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  completeButton: {
    backgroundColor: '#4CAF50', // Verde para finalizar viaje
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Gris para botón deshabilitado
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
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

function DateDisplay({ trip }) {
  return (
    <View style={styles.dateContainer}>
      <MaterialIcons name="run-circle" size={24} color="black" />
      <Text style={styles.dateText}>{formatDate(new Date(trip.tripDate))}</Text>
    </View>
  );
}

function ManageTrip({ navigation, route: { params: trip } }) {
  const [currentTrip, setCurrentTrip] = useState(trip);
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.trip || {});
  const [elementMaps, setElementMaps] = useState(null);

  useEffect(() => {
    const getDistance = async () => {
      const maps = await calculateDistance(trip.origin, trip.destination);
      setElementMaps(maps);
    };

    getDistance();
  }, [trip]);

  useEffect(() => {
    if (data) {
      setCurrentTrip((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const currentStatusTrip = dictionaryStatus[currentTrip?.status];

  const handleStartTrip = () => {
    dispatch(tripActions.startTrip(currentTrip.id));
  };

  const handleCompleteTrip = () => {
    dispatch(tripActions.completeTrip(currentTrip.id));
  };

  const renderActionButton = () => {
    if (loading) {
      return (
        <TouchableOpacity style={styles.disabledButton} disabled>
          <ActivityIndicator color="white" />
        </TouchableOpacity>
      );
    }

    switch (currentTrip.status) {
      case 'OPEN':
      case 'FULL':
        return (
          <TouchableOpacity style={styles.actionButton} onPress={handleStartTrip}>
            <Text style={styles.actionButtonText}>Iniciar viaje</Text>
          </TouchableOpacity>
        );
      case 'IN_PROGRESS':
        return (
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTrip}>
            <Text style={styles.actionButtonText}>Finalizar viaje</Text>
          </TouchableOpacity>
        );
      case 'COMPLETED':
        return (
          <TouchableOpacity style={styles.disabledButton} disabled>
            <Text style={styles.actionButtonText}>Viaje finalizado</Text>
          </TouchableOpacity>
        );
      case 'CANCELLED':
        return (
          <TouchableOpacity style={styles.disabledButton} disabled>
            <Text style={styles.actionButtonText}>Viaje cancelado</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderBar
        title={<DateDisplay trip={currentTrip} />}
        onGoBack={() => navigation.goBack()}
        rightIcon="pencil"
        onRightPress={() => navigation.navigate('EditTrip', currentTrip)}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.statusContainer, currentStatusTrip?.style]}>
          <Text style={styles.statusText}>{currentStatusTrip?.text}</Text>
        </View>

        <Separator />
        <TripView trip={currentTrip} elementMaps={elementMaps} />
        <Separator />
        <TripPrice trip={currentTrip} elementMaps={elementMaps} />
        <Separator />

        <PassengersList passengers={currentTrip.passengers || []} />
        <Separator />

        {renderActionButton()}
      </ScrollView>
    </Container>
  );
}

export default ManageTrip;
