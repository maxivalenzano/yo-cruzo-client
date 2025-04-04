import { notificationConstants } from '../../constants';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
  markingRead: false,
  markSuccess: false,
  saving: false,
  saveSuccess: false,
};

function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    // Obtener todas las notificaciones
    case notificationConstants.GET_ALL_REQUEST:
      return { ...state, loading: true, error: null };
    case notificationConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        notifications: action.notifications,
        loading: false,
        error: null,
      };
    case notificationConstants.GET_ALL_FAILURE:
      return { ...state, error: action.error, loading: false };

    // Marcar notificación como leída
    case notificationConstants.MARK_READ_REQUEST:
      return {
        ...state,
        markingRead: true,
        markSuccess: false,
        error: null,
      };
    case notificationConstants.MARK_READ_SUCCESS:
      return {
        ...state,
        markingRead: false,
        markSuccess: true,
        notifications: state.notifications.map(
          (notification) => (notification.id === action.notificationId
            ? { ...notification, read: true }
            : notification),
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
        error: null,
      };
    case notificationConstants.MARK_READ_FAILURE:
      return {
        ...state,
        markingRead: false,
        markSuccess: false,
        error: action.error,
      };

    // Obtener contador de notificaciones no leídas
    case notificationConstants.COUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case notificationConstants.COUNT_SUCCESS:
      return {
        ...state,
        unreadCount: action.count,
        loading: false,
        error: null,
      };
    case notificationConstants.COUNT_FAILURE:
      return { ...state, error: action.error, loading: false };

    // Guardar nueva notificación
    case notificationConstants.SAVE_REQUEST:
      return {
        ...state,
        saving: true,
        saveSuccess: false,
        error: null,
      };
    case notificationConstants.SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        saveSuccess: true,
        notifications: [action.notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        error: null,
      };
    case notificationConstants.SAVE_FAILURE:
      return {
        ...state,
        saving: false,
        saveSuccess: false,
        error: action.error,
      };

    // Limpiar el estado
    case notificationConstants.CLEAN:
      return initialState;

    default:
      return state;
  }
}

export default notificationReducer;
