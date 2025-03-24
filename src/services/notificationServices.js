import axios from '../axios/axios';
import userHelpers from '../helpers/userHelpers';
import handler from '../helpers/handler';

/**
 * Guarda una nueva notificación en el servidor
 * @param {Object} notification - Datos de la notificación a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
function saveNotification(notification) {
  try {
    const user = userHelpers.getCurrentSession();
    if (!user || !user.id) {
      return Promise.reject(new Error('Usuario no disponible'));
    }

    // Verificar que la notificación tiene los campos requeridos
    if (!notification || !notification.title) {
      return Promise.reject(new Error('Datos de notificación inválidos'));
    }

    const notificationData = {
      ...notification,
      userId: user.id,
    };

    // Verificar si la notificación ya fue enviada en los últimos segundos
    return axios.post('/api/notifications', notificationData)
      .then(handler.handleResponse)
      .catch(handler.handleError);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Obtiene todas las notificaciones del usuario actual
 * @returns {Promise} - Promesa con las notificaciones del usuario
 */
function getUserNotifications() {
  const user = userHelpers.getCurrentSession();
  return axios.get(`/api/notifications/${user.id}`)
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

/**
 * Marca una notificación como leída
 * @param {string} notificationId - ID de la notificación a marcar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
function markNotificationAsRead(notificationId) {
  const user = userHelpers.getCurrentSession();
  return axios.put(`/api/notifications/${notificationId}/read`, { userId: user.id })
    .then(handler.handleResponse)
    .catch(handler.handleError);
}

/**
 * Obtiene el conteo de notificaciones no leídas del usuario actual
 * @returns {Promise} - Promesa con el conteo de notificaciones no leídas
 */
function getUnreadNotificationsCount() {
  const user = userHelpers.getCurrentSession();
  return axios.get(`/api/notifications/${user.id}/unread-count`)
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
