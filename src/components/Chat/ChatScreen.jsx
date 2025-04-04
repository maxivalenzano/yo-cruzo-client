import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import chatActions from '../../redux/actions/chat.actions';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import HeaderBar from '../Commons/HeaderBar';
import Container from '../Commons/Container';

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayDivider: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dayText: {
    backgroundColor: '#E1E1E1',
    color: '#555',
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

function ChatScreen({ route, navigation }) {
  const { chatId, title } = route.params;
  const dispatch = useDispatch();
  const { activeChat, loading, sendingMessage } = useSelector((state) => state.chat);
  const flatListRef = useRef(null);
  const authUser = useSelector((state) => state.authentication.user);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const loadChatHistory = () => {
      if (chatId) {
        dispatch(chatActions.getChatHistory(chatId));
      }
    };

    loadChatHistory();

    return () => {
      // Al salir de la pantalla, limpiar el chat activo
      dispatch(chatActions.clearActiveChat());
    };
  }, [chatId, dispatch]);

  // Autodesplazamiento cuando llegan nuevos mensajes
  useEffect(() => {
    if (
      activeChat
      && activeChat.messages
      && activeChat.messages.length > 0
      && flatListRef?.current
    ) {
      // Solo hacer scroll automático si no se ha hecho scroll manual o es un mensaje nuevo
      if (
        !hasScrolled
        || activeChat.messages[activeChat.messages.length - 1].sender === authUser.id
      ) {
        setTimeout(() => {
          flatListRef?.current?.scrollToEnd({ animated: true });
        }, 200);
      }
    }
  }, [activeChat, authUser.id, hasScrolled]);

  const handleSendMessage = (message) => {
    if (!chatId || !message.trim()) return;
    const receiverId = activeChat.driver.id === authUser.id
      ? activeChat.passenger.id
      : activeChat.driver.id;

    dispatch(chatActions.sendMessage(chatId, message, receiverId));
    // El scroll automático se manejará cuando llegue el nuevo mensaje
  };

  const renderMessage = ({ item, index }) => {
    const isCurrentUser = item.sender === authUser.id;
    const showTimestamp = true;

    // Revisar si hay que mostrar un divisor de día
    let showDayDivider = false;
    if (index === 0) {
      // Siempre mostramos el divisor para el primer mensaje
      showDayDivider = true;
    } else if (index > 0 && activeChat.messages[index - 1]) {
      // Comparamos fechas entre mensajes consecutivos
      const prevDate = new Date(activeChat.messages[index - 1].createdAt).toDateString();
      const currentDate = new Date(item.createdAt).toDateString();
      showDayDivider = prevDate !== currentDate;
    }

    return (
      <>
        {showDayDivider && (
          <View style={styles.dayDivider}>
            <Text style={styles.dayText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
        <ChatBubble message={item} isCurrentUser={isCurrentUser} showTimestamp={showTimestamp} />
      </>
    );
  };

  if (loading && !activeChat) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F85F6A" />
      </View>
    );
  }

  return (
    <Container>
      <HeaderBar title={title || 'Chat'} onGoBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 92 : 0}
      >
        {activeChat && (
          <>
            <FlatList
              ref={flatListRef}
              style={styles.messageList}
              data={activeChat.messages}
              keyExtractor={(item, index) => `msg-${index}-${item.createdAt}`}
              renderItem={renderMessage}
              onScroll={() => setHasScrolled(true)}
              onContentSizeChange={() => {
                if (!hasScrolled && flatListRef?.current) {
                  flatListRef?.current?.scrollToEnd({ animated: false });
                }
              }}
            />
            <ChatInput onSend={handleSendMessage} sending={sendingMessage} />
          </>
        )}
      </KeyboardAvoidingView>
    </Container>
  );
}

export default ChatScreen;
