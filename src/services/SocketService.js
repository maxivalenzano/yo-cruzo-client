import { io } from 'socket.io-client';
import { API_URL } from '../config';
import { userHelpers } from '../helpers';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  async connect() {
    // Si ya existe una conexión, la reutilizamos
    if (this.socket && this.connected) {
      return this.socket;
    }

    try {
      const user = await userHelpers.getSessionFromStorage();
      const token = user?.accessToken;

      // Creamos la conexión enviando el token en auth como espera el backend
      this.socket = io(API_URL, {
        auth: { token },
        transports: ['websocket'],
      });

      return new Promise((resolve, reject) => {
        // Evento cuando se conecta exitosamente
        this.socket.on('connect', () => {
          console.log('Socket conectado con ID:', this.socket.id);
          this.connected = true;
          resolve(this.socket);
        });

        // Manejo de errores de conexión
        this.socket.on('connect_error', (error) => {
          console.error('Error de conexión socket:', error);
          this.connected = false;
          reject(error);
        });

        this.socket.on('disconnect', (reason) => {
          console.log('Socket desconectado:', reason);
          this.connected = false;
        });

        // Manejo de errores enviados por el servidor
        this.socket.on('error', (error) => {
          console.error('Error de socket:', error);
        });
      });
    } catch (error) {
      console.error('Error al inicializar socket:', error);
      throw error;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
    }
  }

  // Unirse a una sala de chat específica (ACTUALIZADO)
  joinChat(chatId) {
    if (this.socket) {
      this.socket.emit('join-chat', { chatId });
    }
  }

  // Enviar mensaje a través de socket (NUEVO)
  // sendMessage(chatId, receiverId, message) {
  //   if (this.socket) {
  //     this.socket.emit('send-message', { chatId, receiverId, message });
  //   }
  // }

  // Marcar mensajes como leídos (NUEVO)
  markMessagesAsRead(chatId) {
    if (this.socket) {
      this.socket.emit('mark-read', { chatId });
    }
  }

  // Escuchar por nuevos mensajes (ACTUALIZADO)
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.off('new-message'); // Evitar duplicación de listeners
      this.socket.on('new-message', (message) => {
        callback(message);
      });
    }
  }

  // Escuchar por notificaciones de mensajes (NUEVO)
  onMessageNotification(callback) {
    if (this.socket) {
      this.socket.off('message-notification'); // Evitar duplicación de listeners
      this.socket.on('message-notification', (data) => {
        callback(data);
      });
    }
  }

  // Escuchar cuando los mensajes son leídos (ACTUALIZADO)
  onMessagesRead(callback) {
    if (this.socket) {
      this.socket.off('messages-read'); // Evitar duplicación de listeners
      this.socket.on('messages-read', (data) => {
        callback(data);
      });
    }
  }
}

// Singleton para toda la aplicación
export default new SocketService();
