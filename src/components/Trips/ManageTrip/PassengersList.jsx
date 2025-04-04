import React, { useEffect } from 'react';
import {
  View, StyleSheet, Text, FlatList, TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import chatActions from '../../../redux/actions/chat.actions';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  passengerCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  passengerDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusContainer: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  confirmedStatus: {
    backgroundColor: '#E3F8E5',
  },
  cancelledStatus: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  confirmedText: {
    color: '#66BB6A',
  },
  cancelledText: {
    color: '#EF5350',
  },
  emptyList: {
    padding: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  chatButton: {
    borderRadius: 20,
    backgroundColor: '#42A5F5',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIconDisabled: {
    opacity: 0.5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// Mensaje cuando no hay pasajeros
function EmptyListComponent() {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyText}>Este viaje no tiene pasajeros registrados.</Text>
    </View>
  );
}

function PassengersList({ passengers = [] }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);

  // Filtramos solo los pasajeros activos primero
  const sortedPassengers = [...passengers].sort((a, b) => {
    // Primero los confirmados, luego cancelados
    if (a.status === 'CONFIRMED' && b.status !== 'CONFIRMED') return -1;
    if (a.status !== 'CONFIRMED' && b.status === 'CONFIRMED') return 1;
    return 0;
  });

  const confirmedCount = passengers.filter((p) => p.status === 'CONFIRMED').length;

  // Función para iniciar chat con un pasajero
  const handleContactPassenger = (passenger) => {
    if (passenger.tripRequest && passenger.status === 'CONFIRMED') {
      dispatch(
        chatActions.getChatByTripRequest(passenger.tripRequest),
      );
    }
  };

  // Cuando el chat está cargado, navegar a él
  useEffect(() => {
    if (activeChat) {
      navigation.navigate('DirectChat', {
        chatId: activeChat.id,
        title: activeChat.passenger?.name || 'Pasajero',
        otherUserId: activeChat.passenger?.id,
      });
    }
  }, [activeChat, dispatch, navigation]);

  // Renderiza cada pasajero en la lista
  const renderPassenger = ({ item: passenger }) => {
    const isConfirmed = passenger.status === 'CONFIRMED';
    const { user } = passenger;

    // Obtiene las iniciales del nombre para el avatar
    const getInitials = (name) => {
      if (!name) return '?';
      const words = name.split(' ');
      return words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0].substring(0, 2);
    };

    return (
      <View style={styles.passengerItem}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={40}
            label={getInitials(user.name)}
            backgroundColor={isConfirmed ? '#42A5F5' : '#BDBDBD'}
          />
        </View>

        <View style={styles.passengerInfo}>
          <Text style={styles.passengerName} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.passengerDetails}>
            Unido el
            {' '}
            {new Date(passenger.joinedAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <View
            style={[
              styles.statusContainer,
              isConfirmed ? styles.confirmedStatus : styles.cancelledStatus,
            ]}
          >
            <Text
              style={[styles.statusText, isConfirmed ? styles.confirmedText : styles.cancelledText]}
            >
              {isConfirmed ? 'Confirmado' : 'Cancelado'}
            </Text>
          </View>

          {/* Botón de chat */}
          {passenger.tripRequest && (
            <TouchableOpacity
              style={[styles.chatButton, !isConfirmed && styles.chatIconDisabled]}
              disabled={!isConfirmed}
              onPress={() => handleContactPassenger(passenger)}
            >
              <Ionicons name="chatbubble" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people" size={20} color="#333" />
        <Text style={styles.title}>Pasajeros</Text>
        <Text style={styles.passengerCount}>
          (
          {confirmedCount}
          /
          {passengers.length}
          )
        </Text>
      </View>

      <FlatList
        data={sortedPassengers}
        renderItem={renderPassenger}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyListComponent}
        scrollEnabled={false}
      />
    </View>
  );
}

export default PassengersList;
