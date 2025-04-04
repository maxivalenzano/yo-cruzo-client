import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import chatActions from '../../redux/actions/chat.actions';
import ChatListItem from './ChatListItem';
import SocketService from '../../services/SocketService';
import Container from '../Commons/Container';
import HeaderBar from '../Commons/HeaderBar';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { chats, loading } = useSelector((state) => state.chat);
  const [refreshing, setRefreshing] = useState(false);
  const authUser = useSelector((state) => state.authentication.user);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        await SocketService.connect();

        SocketService.onNewMessage((message) => {
          dispatch(chatActions.newMessageReceived(message));
        });

        SocketService.onMessagesRead((data) => {
          dispatch(chatActions.messagesMarkedRead(data));
        });

        // Añadir listener para notificaciones de mensajes
        SocketService.onMessageNotification((notification) => {
          dispatch(chatActions.messageNotificationReceived(notification));
        });
      } catch (error) {
        console.error('Error connecting to chat socket:', error);
      }
    };

    const loadChats = () => {
      dispatch(chatActions.getChats());
    };

    loadChats();
    connectSocket();
  }, [dispatch]);

  useEffect(() => {
    // Cuando regresamos a esta pantalla, marcar como activa para recibir notificaciones
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(chatActions.clearActiveChat());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(chatActions.getChats());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const navigateToChat = (chat) => {
    const otherUser = chat.driver.id === authUser.id ? chat.passenger : chat.driver;
    const chatId = chat.id;

    navigation.navigate('ChatConversation', {
      chatId,
      title: otherUser.name || otherUser.email,
      otherUserId: otherUser.id,
    });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text style={styles.emptyText}>No tienes conversaciones activas.</Text>
    </View>
  );

  const getUnreadCount = (chat) => {
    if (!chat || !chat.messages) return 0;

    return chat.messages.filter((msg) => !msg.read && msg.sender !== authUser.id).length;
  };

  if (loading && !refreshing && (!chats || chats.length === 0)) {
    return (
      <Container>
        <HeaderBar title="Mis mensajes" onGoBack={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F85F6A" />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderBar title="Mis mensajes" onGoBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              chat={item}
              currentUserId={authUser.id}
              unreadCount={getUnreadCount(item)}
              onPress={() => navigateToChat(item)}
            />
          )}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#F85F6A']}
              tintColor="#F85F6A"
            />
          )}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
    </Container>
  );
}

export default ChatListScreen;
