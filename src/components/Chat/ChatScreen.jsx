import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import chatActions from '../../redux/actions/chat.actions';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
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

function ChatScreen({ route }) {
  const { chatId } = route.params;
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

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender === authUser.id;
    const showTimestamp = true; // Siempre mostrar el timestamp para simplicidad

    return (
      <ChatBubble message={item} isCurrentUser={isCurrentUser} showTimestamp={showTimestamp} />
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
    <KeyboardAvoidingView
      style={styles.container}
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
  );
}

export default ChatScreen;
