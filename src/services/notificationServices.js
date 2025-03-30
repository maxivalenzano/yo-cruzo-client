import axios from '../axios/axios';
import handler from '../helpers/handler';
import { getCurrentUserId } from '../helpers/authHelpers';

/**
 * Guarda una nueva notificación en el servidor
 * @param {Object} notification - Datos de la notificación a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
function saveNotification(notification) {
  const userId = getCurrentUserId();

  const notificationData = {
    ...notification,
    userId,
  };

  // Verificar si la notificación ya fue enviada en los últimos segundos
  return axios.post('/api/notifications', notificationData)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

/**
 * Obtiene todas las notificaciones del usuario actual
 * @returns {Promise} - Promesa con las notificaciones del usuario
 */
function getUserNotifications() {
  const userId = getCurrentUserId();

  return axios.get(`/api/notifications/${userId}`)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

/**
 * Marca una notificación como leída
 * @param {string} notificationId - ID de la notificación a marcar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
function markNotificationAsRead(notificationId) {
  const userId = getCurrentUserId();

  return axios.put(`/api/notifications/${notificationId}/read`, { userId })
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

/**
 * Obtiene el conteo de notificaciones no leídas del usuario actual
 * @returns {Promise} - Promesa con el conteo de notificaciones no leídas
 */
function getUnreadNotificationsCount() {
  const userId = getCurrentUserId();

  return axios.get(`/api/notifications/${userId}/unread-count`)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

const notificationServices = {
  saveNotification,
  getUserNotifications,
  markNotificationAsRead,
  getUnreadNotificationsCount,
};

export default notificationServices;
