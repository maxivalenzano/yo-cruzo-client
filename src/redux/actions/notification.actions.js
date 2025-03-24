import { notificationConstants } from '../../constants';
import { getNotifications, markAsRead, getUnreadCount } from '../../services/NotificationService';
import notificationServices from '../../services/notificationServices';
import alertActions from './alert.actions';

// Obtener todas las notificaciones
function getAllNotifications() {
  function request() { return { type: notificationConstants.GET_ALL_REQUEST }; }
  function success(notifications) { return { type: notificationConstants.GET_ALL_SUCCESS, notifications }; }
  function failure(error) { return { type: notificationConstants.GET_ALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    getNotifications()
      .then(
        (notifications) => {
          dispatch(success(notifications));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(`Error al obtener notificaciones: ${error.toString()}`));
        },
      );
  };
}

// Marcar notificación como leída
function markNotificationAsRead(notificationId) {
  function request() { return { type: notificationConstants.MARK_READ_REQUEST }; }
  function success(id) { return { type: notificationConstants.MARK_READ_SUCCESS, notificationId: id }; }
  function failure(error) { return { type: notificationConstants.MARK_READ_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    markAsRead(notificationId)
      .then(
        () => {
          dispatch(success(notificationId));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(`Error al marcar notificación como leída: ${error.toString()}`));
        },
      );
  };
}

// Obtener contador de notificaciones no leídas
function getNotificationsCount() {
  function request() { return { type: notificationConstants.COUNT_REQUEST }; }
  function success(count) { return { type: notificationConstants.COUNT_SUCCESS, count }; }
  function failure(error) { return { type: notificationConstants.COUNT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    getUnreadCount()
      .then(
        (count) => {
          dispatch(success(count));
        },
        (error) => {
          dispatch(failure(error.toString()));
          console.error('Error al obtener conteo de notificaciones:', error);
        },
      );
  };
}

// Guardar una nueva notificación
function saveNewNotification(notificationData) {
  function request() { return { type: notificationConstants.SAVE_REQUEST }; }
  function success(notification) { return { type: notificationConstants.SAVE_SUCCESS, notification }; }
  function failure(error) { return { type: notificationConstants.SAVE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    notificationServices.saveNotification(notificationData)
      .then(
        (response) => {
          dispatch(success(notificationData));
        },
        (error) => {
          dispatch(failure(error.toString()));
          console.error('Error al guardar notificación:', error);
        },
      );
  };
}

// Limpiar el estado de notificaciones
function cleanNotifications() {
  return { type: notificationConstants.CLEAN };
}

const notificationActions = {
  getAllNotifications,
  markNotificationAsRead,
  getNotificationsCount,
  saveNewNotification,
  cleanNotifications,
};

export default notificationActions;
