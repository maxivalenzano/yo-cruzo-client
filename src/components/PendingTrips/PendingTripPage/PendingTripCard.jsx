import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import TripCard from '../../SearchTrips/SearchTripList/TripCard';
import { alertActions } from '../../../redux/actions';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  passengerName: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  requestInfo: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  statusText: {
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
  successText: {
    color: '#4CAF50',
  },
  errorText: {
    color: '#F44336',
  },
});

function PendingTripCard({ request, onAccept, onReject }) {
  const dispatch = useDispatch();
  const {
    loading, accepted, cancelled, error,
  } = useSelector((state) => state.tripRequest);

  // Determinar si esta solicitud específica está aceptada o cancelada
  const isThisRequestAccepted = accepted === request.id;
  const isThisRequestCancelled = cancelled === request.id;
  const isThisRequestLoading = loading === request.id;

  // Manejar la aceptación de la solicitud con feedback
  const handleAccept = () => {
    try {
      onAccept(request.passenger.id, request.id);
      // El feedback se mostrará cuando el estado cambie a "accepted"
    } catch (err) {
      dispatch(alertActions.error(`Error al aceptar la solicitud: ${err.message}`));
    }
  };

  // Manejar el rechazo de la solicitud con feedback
  const handleReject = () => {
    try {
      onReject(request.id);
      // El feedback se mostrará cuando el estado cambie a "cancelled"
    } catch (err) {
      dispatch(alertActions.error(`Error al rechazar la solicitud: ${err.message}`));
    }
  };

  // Mostrar mensajes de estado según el estado de la solicitud
  const renderStatusMessage = () => {
    if (error && (loading === request.id || accepted === request.id || cancelled === request.id)) {
      return <Text style={[styles.statusText, styles.errorText]}>{error}</Text>;
    }

    if (isThisRequestAccepted) {
      return (
        <Text style={[styles.statusText, styles.successText]}>
          Solicitud aceptada correctamente
        </Text>
      );
    }

    if (isThisRequestCancelled) {
      return <Text style={styles.statusText}>Solicitud rechazada</Text>;
    }

    return null;
  };

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <TripCard trip={request.trip} showStatus />

        <View style={styles.passengerInfo}>
          <Ionicons name="person-circle-outline" size={24} color="#666" />
          <Text style={styles.passengerName}>
            {request.passenger.name || request.passenger.username}
          </Text>
        </View>

        <Text style={styles.message}>{request.message}</Text>

        <View style={styles.requestInfo}>
          <Text style={styles.date}>
            Solicitado el
            {' '}
            {dayjs(request.requestDate).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>

        {renderStatusMessage()}

        <View style={styles.buttonsContainer}>
          <Button
            mode="outlined"
            onPress={handleReject}
            disabled={isThisRequestLoading || isThisRequestAccepted || isThisRequestCancelled}
            textColor="#F85F6A"
          >
            {isThisRequestLoading ? (
              <ActivityIndicator size="small" color="#F85F6A" />
            ) : (
              <Text style={{ color: '#F85F6A' }}>Rechazar</Text>
            )}
          </Button>
          <Button
            mode="contained"
            onPress={handleAccept}
            disabled={isThisRequestLoading || isThisRequestAccepted || isThisRequestCancelled}
            buttonColor="#F85F6A"
          >
            {isThisRequestLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white' }}>Aceptar</Text>
            )}
          </Button>
        </View>
      </View>
    </Card>
  );
}

export default PendingTripCard;
