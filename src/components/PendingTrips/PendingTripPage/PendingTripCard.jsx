import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import TripCard from '../../SearchTrips/SearchTripList/TripCard';
import { alertActions, chatActions } from '../../../redux/actions';

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
  acceptButtonText: {
    color: 'white',
  },
  rejectButtonText: {
    color: '#F85F6A',
  },
});

function PendingTripCard({ request, onAccept, onReject }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    loading, accepted, cancelled, error,
  } = useSelector((state) => state.tripRequest);
  const { activeChat } = useSelector((state) => state.chat);

  // Determinar si esta solicitud específica está aceptada o cancelada
  const isThisRequestAccepted = accepted === request.id;
  const isThisRequestCancelled = cancelled === request.id;
  const isThisRequestLoading = loading === request.id;

  // Una vez aceptada la solicitud, obtener el chat correspondiente
  useEffect(() => {
    if (isThisRequestAccepted && !activeChat) {
      // El backend genera automáticamente un chat cuando se acepta la solicitud
      // Aquí obtenemos ese chat para navegar a él
      dispatch(chatActions.getChatByTripRequest(request.id));
    }
  }, [isThisRequestAccepted, activeChat, request.id, dispatch]);

  // Cuando el chat está cargado, navegar a él
  useEffect(() => {
    if (isThisRequestAccepted && activeChat) {
      setTimeout(() => {
        navigation.navigate('DirectChat', {
          chatId: activeChat.id,
          title: request.passenger.name || request.passenger.email,
          otherUserId: request.passenger.id,
        });
      }, 1000); // Damos tiempo para mostrar el mensaje de éxito
    }
  }, [activeChat, isThisRequestAccepted, navigation, request]);

  // Manejar la aceptación de la solicitud con feedback
  const handleAccept = () => {
    try {
      onAccept(request.id);
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
          Solicitud aceptada correctamente. Abriendo chat...
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
            {request.passenger.name || request.passenger.email}
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
            loading={isThisRequestLoading}
          >
            <Text style={styles.rejectButtonText}>Rechazar</Text>
          </Button>
          <Button
            mode="contained"
            onPress={handleAccept}
            disabled={isThisRequestLoading || isThisRequestAccepted || isThisRequestCancelled}
            buttonColor="#F85F6A"
            loading={isThisRequestLoading}
          >
            <Text style={styles.acceptButtonText}>Aceptar</Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}

export default PendingTripCard;
