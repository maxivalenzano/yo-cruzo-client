import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configurar el manejador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Función para enviar notificaciones push
export const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'YoCruzo Notificación',
    body: '¡Nueva actualización de tu cruce!',
    data: { type: 'test_notification' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

// Manejo de errores de registro
const handleRegistrationError = (errorMessage) => {
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
    const token = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    return token.data;
  } catch (e) {
    return handleRegistrationError(`Error: ${e}`);
  }
};

// Configurar los listeners de notificaciones
export const setupNotificationListeners = (
  setNotification,
  setExpoPushToken,
) => {
  // Registrar para notificaciones push
  registerForPushNotificationsAsync()
    .then((token) => {
      if (token) setExpoPushToken(token);
    })
    .catch((error) => console.error(error));

  // Listener para notificaciones recibidas mientras la app está abierta
  const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
    setNotification(notification);
  });

  // Listener para respuestas a notificaciones (cuando el usuario toca una notificación)
  const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('addNotificationResponseReceivedListener', response);
    // Aquí puedes manejar la navegación cuando el usuario toca una notificación
  });

  // Retornar función de limpieza
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};
