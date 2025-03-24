import React, { useEffect, useState, useCallback } from 'react';
import {
  View, FlatList, Text, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { notificationActions } from '../redux/actions';
import Container from '../components/Commons/Container';

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#FFF0F1',
    borderLeftWidth: 3,
    borderLeftColor: '#F85F6A',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    alignSelf: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F85F6A',
    marginBottom: 16,
  },
});

function NotificationItem({ notification, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationBody}>{notification.body}</Text>
        <Text style={styles.notificationTime}>
          {new Date(notification.createdAt).toLocaleString()}
        </Text>
      </View>
      {!notification.read && (
        <View style={styles.unreadDot}>
          <Ionicons name="ellipse" size={12} color="#F85F6A" />
        </View>
      )}
    </TouchableOpacity>
  );
}

function NotificationsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { notifications, loading, unreadCount } = useSelector((state) => state.notification);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    dispatch(notificationActions.getAllNotifications());
  }, [dispatch]);

  // Manejar el refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(notificationActions.getAllNotifications());
    setTimeout(() => setRefreshing(false), 1000); // Simular tiempo de carga
  }, [dispatch]);

  // Manejar click en notificación
  const handleNotificationPress = useCallback(
    (notification) => {
      if (!notification.read) {
        dispatch(notificationActions.markNotificationAsRead(notification.id));
      }

      // Navegar según el tipo de notificación
      if (notification.data && notification.data.type) {
        const { type } = notification.data;

        switch (type) {
          case 'TRIP_REQUEST_CREATED':
            navigation.navigate('PendingTripRequest');
            break;
          case 'TRIP_REQUEST_ACCEPTED':
            navigation.navigate('MyTrips');
            break;
          case 'TRIP_REQUEST_REJECTED':
            navigation.navigate('MyTrips');
            break;
          case 'TRIP_CANCELLED':
            navigation.navigate('MyTrips');
            break;
          // Agregar más casos según los tipos de notificaciones que existan
          default:
          // No navegar a ningún lado
        }
      }
    },
    [dispatch, navigation],
  );

  return (
    <Container>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Mis Notificaciones</Text>

        {unreadCount > 0 && (
          <Text style={styles.statusText}>{`${unreadCount} notificaciones no leidas`}</Text>
        )}

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationItem notification={item} onPress={handleNotificationPress} />
          )}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={handleRefresh}
              colors={['#F85F6A']}
            />
          )}
          ListEmptyComponent={(
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off-outline" size={64} color="#D2DAE2" />
              <Text style={styles.emptyText}>No tienes notificaciones</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </Container>
  );
}

export default NotificationsScreen;
