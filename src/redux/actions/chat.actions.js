import chatConstants from '../../constants/chat.constants';
import ChatService from '../../services/ChatService';
import SocketService from '../../services/SocketService';
import alertActions from './alert.actions';

// Añadir esta acción al inicializar el módulo de chat
export const setCurrentUserId = (userId) => ({
  type: chatConstants.SET_CURRENT_USER_ID,
  userId,
});

// Obtener todos los chats de un usuario
const getChats = () => async (dispatch) => {
  function request() { return { type: chatConstants.GET_CHATS_REQUEST }; }
  function success(chats) { return { type: chatConstants.GET_CHATS_SUCCESS, chats }; }
  function failure(error) { return { type: chatConstants.GET_CHATS_FAILURE, error }; }
  try {
    dispatch(request());
    const chats = await ChatService.getChats();
    dispatch(success(chats));
  } catch (error) {
    dispatch(failure(error.toString()));
  }
};

// Obtener historial de mensajes de un chat
function getChatHistory(chatId) {
  function request() { return { type: chatConstants.GET_CHAT_HISTORY_REQUEST }; }
  function success(chatData) {
    return {
      type: chatConstants.GET_CHAT_HISTORY_SUCCESS,
      chatData,
    };
  }
  function failure(error) { return { type: chatConstants.GET_CHAT_HISTORY_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    ChatService.getChatHistory(chatId)
      .then(
        (chatData) => {
          dispatch(success(chatData));
          // Unirse al chat por socket - usando el evento actualizado
          SocketService.connect().then(() => {
            SocketService.joinChat(chatId);
            // Marcar mensajes como leídos cuando se abre el chat
            SocketService.markMessagesAsRead(chatId);
          });
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

// Buscar chat por ID de solicitud de viaje
function getChatByTripRequest(tripRequestId) {
  function request() { return { type: chatConstants.GET_CHAT_HISTORY_REQUEST }; }
  function success(chatData) {
    return {
      type: chatConstants.GET_CHAT_HISTORY_SUCCESS,
      chatData,
    };
  }
  function failure(error) { return { type: chatConstants.GET_CHAT_HISTORY_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    ChatService.getChatByTripRequest(tripRequestId)
      .then(
        (chatData) => {
          dispatch(success(chatData));
          // Unirse al chat por socket
          SocketService.connect().then(() => {
            SocketService.joinChat(chatData.id);
          });
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error('No se encontró chat para esta solicitud'));
        },
      );
  };
}

// Enviar mensaje
function sendMessage(chatId, message, receiverId) {
  function request() { return { type: chatConstants.SEND_MESSAGE_REQUEST }; }
  function success(mD) { return { type: chatConstants.SEND_MESSAGE_SUCCESS, messageData: mD }; }
  function failure(error) { return { type: chatConstants.SEND_MESSAGE_FAILURE, error }; }

  return async (dispatch) => {
    dispatch(request());

    try {
      // Creamos un ID temporal para poder identificar el mensaje fácilmente
      const tempMessageData = {
        id: `temp-${Date.now()}`,
        receiver: receiverId, // El receptor desde la perspectiva del servidor
        message,
        chatId,
        createdAt: new Date().toISOString(),
        read: false,
      };

      // Agregamos el mensaje al estado inmediatamente para UI responsiva
      dispatch(success(tempMessageData));

      // Luego lo enviamos por API
      await ChatService.sendMessage(chatId, message, receiverId);

      // No necesitamos despachar success nuevamente porque
      // recibiremos el mensaje por socket con el ID real
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  };
}

// Marcar mensajes como leídos
function markMessagesAsRead(chatId) {
  function request() { return { type: chatConstants.MARK_READ_REQUEST }; }
  function success(id) { return { type: chatConstants.MARK_READ_SUCCESS, chatId: id }; }
  function failure(error) { return { type: chatConstants.MARK_READ_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    // También usar el API para garantizar que se guarde
    ChatService.markMessagesAsRead(chatId)
      .then(
        () => {
          dispatch(success(chatId));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

// Recibir nuevo mensaje (desde Socket.IO)
function newMessageReceived(message) {
  return { type: chatConstants.NEW_MESSAGE_RECEIVED, message };
}

// Recibir notificación de mensajes leídos (desde Socket.IO)
function messagesMarkedRead(data) {
  return { type: chatConstants.MESSAGES_MARKED_READ, data };
}

// Nuevo método para manejar notificaciones de mensajes
function messageNotificationReceived(notification) {
  return { type: chatConstants.MESSAGE_NOTIFICATION_RECEIVED, notification };
}

// Actualizar contadores de mensajes no leídos
function updateUnreadCounts() {
  return { type: chatConstants.UPDATE_UNREAD_COUNTS };
}

// Limpiar el chat activo
function clearActiveChat() {
  return { type: chatConstants.CLEAR_ACTIVE_CHAT };
}

const chatActions = {
  getChats,
  getChatHistory,
  getChatByTripRequest,
  sendMessage,
  markMessagesAsRead,
  newMessageReceived,
  messagesMarkedRead,
  messageNotificationReceived,
  updateUnreadCounts,
  clearActiveChat,
};

export default chatActions;
