/* eslint-disable default-param-last */
import chatConstants from '../../constants/chat.constants';

function countUnreadMessages(chats, userId) {
  if (!chats || !Array.isArray(chats)) return 0;
  if (!userId) return 0;

  const countUnread = chats.reduce((count, chat) => {
    const unreadInChat = chat.messages && Array.isArray(chat.messages)
      ? chat.messages.filter((msg) => !msg.read && msg.sender !== userId).length
      : 0;
    return count + unreadInChat;
  }, 0);

  return countUnread;
}

function markMessagesAsReadInChat(chat, userId) {
  if (!chat || !chat.messages || !Array.isArray(chat.messages)) return chat;
  if (!userId) return chat;

  return {
    ...chat,
    messages: chat.messages.map((msg) => (msg.sender !== userId && !msg.read
      ? { ...msg, read: true }
      : msg)),
  };
}

function recalculateUnreadCount(chats, markedChatId, userId) {
  const updatedChats = chats.map((chat) => (chat.id === markedChatId
    ? markMessagesAsReadInChat(chat, userId)
    : chat));
  return countUnreadMessages(updatedChats, userId);
}

// Nueva función helper para verificar si un mensaje ya existe en un array de mensajes
function messageExists(message, messages) {
  if (!message || !messages || !Array.isArray(messages)) return false;

  // Si el mensaje tiene un ID único, usamos eso para comparar
  if (message.id) {
    return messages.some((msg) => msg.id === message.id);
  }

  // Si no tiene ID, comparamos por contenido y timestamp
  return messages.some((msg) => msg.sender === message.sender
    && msg.message === message.message
    && msg.createdAt === message.createdAt);
}

function handleNewMessage(state, newMessage, userId) {
  if (!userId) return state;

  // Actualizar chat activo si corresponde al mensaje recibido
  let updatedActiveChat = state.activeChat;
  if (state.activeChat && state.activeChat.id === newMessage.chatId) {
    // Comprobar si el mensaje ya existe en el chat activo
    if (messageExists(newMessage, state.activeChat.messages)) {
      return state;
    }

    // Marcar como leído si estamos viendo el chat
    const messageWithReadStatus = {
      ...newMessage,
      read: newMessage.sender === userId,
    };

    updatedActiveChat = {
      ...state.activeChat,
      messages: [...state.activeChat.messages, messageWithReadStatus],
      lastActivity: new Date().toISOString(),
    };
  }

  // Actualizar lista de chats
  const updatedChats = state.chats.map((chat) => {
    if (chat.id === newMessage.chatId) {
      // Comprobar si el mensaje ya existe en este chat
      if (messageExists(newMessage, chat.messages)) {
        return chat;
      }

      return {
        ...chat,
        messages: [...chat.messages, newMessage],
        lastActivity: new Date().toISOString(),
      };
    }
    return chat;
  });

  return {
    ...state,
    activeChat: updatedActiveChat,
    chats: updatedChats,
    unreadCount: countUnreadMessages(updatedChats, userId),
  };
}

function handleMessagesMarkedRead(state, data, currentUserId) {
  const { chatId, userId } = data;

  // Solo marcar como leídos los mensajes enviados por el usuario actual
  if (userId !== currentUserId) {
    let updatedActiveChat = state.activeChat;
    if (state.activeChat && state.activeChat.id === chatId) {
      updatedActiveChat = {
        ...state.activeChat,
        messages: state.activeChat.messages.map((msg) => (msg.sender === currentUserId
          ? { ...msg, read: true }
          : msg)),
      };
    }

    const updatedChats = state.chats.map((chat) => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.map((msg) => (msg.sender === currentUserId
            ? { ...msg, read: true }
            : msg)),
        };
      }
      return chat;
    });

    return {
      ...state,
      activeChat: updatedActiveChat,
      chats: updatedChats,
    };
  }

  return state;
}

const initialState = {
  loading: false,
  chats: [],
  activeChat: null,
  error: null,
  sendingMessage: false,
  unreadCount: 0,
  currentUserId: null,
};

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case chatConstants.SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: action.userId,
      };

    case chatConstants.GET_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case chatConstants.GET_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.chats,
        error: null,
        unreadCount: countUnreadMessages(action.chats, state.currentUserId),
      };
    case chatConstants.GET_CHATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case chatConstants.GET_CHAT_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case chatConstants.GET_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        activeChat: action.chatData,
        error: null,
      };
    case chatConstants.GET_CHAT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case chatConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendingMessage: true,
      };
    case chatConstants.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendingMessage: false,
      };
    case chatConstants.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendingMessage: false,
        error: action.error,
      };

    case chatConstants.MARK_READ_SUCCESS:
      return {
        ...state,
        activeChat: markMessagesAsReadInChat(state.activeChat, state.currentUserId),
        chats: state.chats.map((chat) => (chat.id === action.chatId
          ? markMessagesAsReadInChat(chat, state.currentUserId)
          : chat)),
        unreadCount: recalculateUnreadCount(state.chats, action.chatId, state.currentUserId),
      };

    case chatConstants.NEW_MESSAGE_RECEIVED:
      return handleNewMessage(state, action.message, state.currentUserId);

    case chatConstants.MESSAGES_MARKED_READ:
      return handleMessagesMarkedRead(state, action.data, state.currentUserId);

    case chatConstants.UPDATE_UNREAD_COUNTS:
      return {
        ...state,
        unreadCount: countUnreadMessages(state.chats, state.currentUserId),
      };

    case chatConstants.CLEAR_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: null,
      };

    default:
      return state;
  }
}

export default chatReducer;
