import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../redux/actions';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

function NotificationBadge({ forceUpdate }) {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Actualizar el contador cuando se monte el componente,
    // cambie el foco o se solicite una actualización
    dispatch(notificationActions.getNotificationsCount());
  }, [dispatch, isFocused, forceUpdate]);

  if (unreadCount === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {unreadCount > 99 ? '99+' : unreadCount}
      </Text>
    </View>
  );
}

export default NotificationBadge;
