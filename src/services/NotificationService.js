import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationServices from './notificationServices';

// Configurar el manejador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Manejo de errores de registro
export const handleRegistrationError = (errorMessage) => {
  console.error(errorMessage);
  return errorMessage;
};

// Registrarse para recibir notificaciones push
export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return handleRegistrationError('No se otorgó permiso para recibir notificaciones');
  }

  // Obtener el projectId de la configuración de Expo
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    return handleRegistrationError('No se encontró el ID del proyecto');
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch (e) {
    return handleRegistrationError(`Error: ${e}`);
  }
};

// Obtener notificaciones locales
export const getLocalNotifications = async () => {
  try {
    const localData = await AsyncStorage.getItem('@notifications');
    return localData ? JSON.parse(localData) : [];
  } catch (error) {
    console.error('Error al obtener notificaciones locales:', error);
    return [];
  }
};

// Guardar una notificación recibida en local y en MongoDB (a través del backend)
export const saveNotification = async (notification, userId) => {
  if (!notification || !userId) {
    console.error('Datos insuficientes para guardar notificación');
    return null;
  }

  try {
    // Crear objeto de notificación
    const notificationData = {
      id: notification?.messageId || notification.request?.identifier || Date.now().toString(),
      title: notification.data?.title || notification.request?.content?.title || 'Notificación',
      body: notification.data?.body || notification.request?.content?.body || '',
      data: notification.data || notification.request?.content?.data || {},
      read: false,
      createdAt: new Date().toISOString(),
      userId,
    };

    // Verificar si ya existe esta notificación para evitar duplicados
    const existingNotifications = await getLocalNotifications();
    const isDuplicate = existingNotifications.some(
      (item) => item.id === notificationData.id
        || (item.title === notificationData.title
          && item.body === notificationData.body
          && Math.abs(new Date(item.createdAt) - new Date(notificationData.createdAt)) < 5000),
    );

    if (isDuplicate) {
      console.error('Notificación duplicada, ignorando:', notificationData.title);
      return null;
    }

    // Guardar en MongoDB a través del servicio
    await notificationServices.saveNotification(notificationData);

    // Guardar localmente
    const localNotifications = (await getLocalNotifications()) || [];
    if (Array.isArray(localNotifications)) {
      localNotifications.push(notificationData);
      await AsyncStorage.setItem('@notifications', JSON.stringify(localNotifications));
    } else {
      await AsyncStorage.setItem('@notifications', JSON.stringify([notificationData]));
    }

    return notificationData;
  } catch (error) {
    console.error('Error al guardar notificación:', error);
    // Si hay un error con la API, al menos guardamos localmente
    try {
      const localNotifications = (await getLocalNotifications()) || [];
      const notificationData = {
        id: notification?.messageId || notification.request?.identifier || Date.now().toString(),
        title: notification.data?.title || notification.request?.content?.title || 'Notificación',
        body: notification.data?.body || notification.request?.content?.body || '',
        data: notification.data || notification.request?.content?.data || {},
        read: false,
        createdAt: new Date().toISOString(),
        userId,
      };

      if (Array.isArray(localNotifications)) {
        localNotifications.push(notificationData);
        await AsyncStorage.setItem('@notifications', JSON.stringify(localNotifications));
      } else {
        await AsyncStorage.setItem('@notifications', JSON.stringify([notificationData]));
      }

      return notificationData;
    } catch (localError) {
      console.error('Error guardando notificación localmente:', localError);
      return null;
    }
  }
};

// Obtener notificaciones desde MongoDB (a través del backend)
export const getNotifications = async () => {
  try {
    // Obtener desde tu API utilizando el servicio
    const response = await notificationServices.getUserNotifications();
    const notifications = response.data;

    // Actualizar cache local
    await AsyncStorage.setItem('@notifications', JSON.stringify(notifications));

    return notifications;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    // Si hay error, intentar obtener desde local
    return getLocalNotifications();
  }
};

// Marcar notificación como leída
export const markAsRead = async (notificationId) => {
  try {
    // Actualizar en MongoDB a través del servicio
    await notificationServices.markNotificationAsRead(notificationId);

    // Actualizar localmente
    const localNotifications = await getLocalNotifications();
    const updatedNotifications = localNotifications.map(
      (notification) => (notification.id === notificationId
        ? { ...notification, read: true }
        : notification),
    );
    await AsyncStorage.setItem('@notifications', JSON.stringify(updatedNotifications));

    return true;
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);

    // Intenta al menos actualizar localmente
    try {
      const localNotifications = await getLocalNotifications();
      const updatedNotifications = localNotifications.map(
        (notification) => (notification.id === notificationId
          ? { ...notification, read: true }
          : notification),
      );
      await AsyncStorage.setItem('@notifications', JSON.stringify(updatedNotifications));
      return true;
    } catch (localError) {
      console.error('Error actualizando notificación localmente:', localError);
      return false;
    }
  }
};

// Obtener conteo de notificaciones no leídas
export const getUnreadCount = async () => {
  try {
    // Obtener conteo desde la API utilizando el servicio
    const response = await notificationServices.getUnreadNotificationsCount();
    return response.count;
  } catch (error) {
    console.error('Error al obtener conteo de notificaciones no leídas:', error);

    // Si hay error, calcular desde las notificaciones locales
    try {
      const notifications = await getLocalNotifications();
      return notifications.filter((notification) => !notification.read).length;
    } catch (localError) {
      console.error('Error al obtener conteo local de notificaciones no leídas:', localError);
      return 0;
    }
  }
};
