import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import Avatar from '../Commons/Avatar';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    backgroundColor: 'white',
  },
  unreadContainer: {
    backgroundColor: '#FEFEFE',
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: '#666',
    fontSize: 14,
    marginRight: 8,
    flex: 1,
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: '#F85F6A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
});

function formatDate(date) {
  const now = new Date();
  const messageDate = new Date(date);

  // Si es de hoy, mostrar la hora
  if (
    now.getDate() === messageDate.getDate()
    && now.getMonth() === messageDate.getMonth()
    && now.getFullYear() === messageDate.getFullYear()
  ) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Si es de ayer
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    yesterday.getDate() === messageDate.getDate()
    && yesterday.getMonth() === messageDate.getMonth()
    && yesterday.getFullYear() === messageDate.getFullYear()
  ) {
    return 'Ayer';
  }

  // Si es de esta semana
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  if (messageDate >= weekStart) {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[messageDate.getDay()];
  }

  // Para fechas más antiguas
  return messageDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
}

function ChatListItem({
  chat, currentUserId, unreadCount, onPress,
}) {
  const otherUser = chat?.driver?.id === currentUserId ? chat.passenger : chat.driver;
  const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
  const authUser = useSelector((state) => state.authentication.user);

  return (
    <TouchableOpacity
      style={[styles.container, unreadCount > 0 && styles.unreadContainer]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        {authUser?.profileImage ? (
          <Avatar.Image size={50} source={{ uri: authUser.profileImage }} />
        ) : (
          <Ionicons name="person-circle" size={50} color="#666" />
        )}
        {/* Uncomment if implementing online status
        <View style={styles.onlineIndicator} />
        */}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {otherUser.name || otherUser.email}
          </Text>
          {lastMessage && (
            <Text style={styles.time}>
              {formatDate(lastMessage.createdAt)}
            </Text>
          )}
        </View>

        <View style={styles.messageContainer}>
          {lastMessage ? (
            <Text
              style={[styles.message, unreadCount > 0 && styles.unreadMessage]}
              numberOfLines={1}
            >
              {lastMessage.sender === currentUserId ? 'Tú: ' : ''}
              {lastMessage.message}
            </Text>
          ) : (
            <Text style={styles.message}>No hay mensajes</Text>
          )}

          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChatListItem;
