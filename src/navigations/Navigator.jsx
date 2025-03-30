import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { userActions, notificationActions } from '../redux/actions';
import { registerForPushNotificationsAsync, saveNotification } from '../services/NotificationService';
import SocketService from '../services/SocketService';
import chatActions from '../redux/actions/chat.actions';

function AppRoute() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  const userId = useSelector((state) => state.authentication.user?.id);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  // Inicializar Socket.IO cuando el usuario inicia sesión
  React.useEffect(() => {
    if (isLoggedIn && userId) {
      // Inicializar socket para chat en tiempo real
      SocketService.connect().then(() => {
        console.log('Socket.IO connected for real-time chat');

        // Configurar listeners para mensajes y marcado de lectura
        SocketService.onNewMessage((message) => {
          dispatch(chatActions.newMessageReceived(message));
        });

        SocketService.onMessagesRead((data) => {
          dispatch(chatActions.messagesMarkedRead(data));
        });

        // Nuevo listener para notificaciones de mensajes
        SocketService.onMessageNotification((notification) => {
          dispatch(chatActions.messageNotificationReceived(notification));
        });

        // Cargar chats al iniciar
        dispatch(chatActions.getChats());
      }).catch((err) => {
        console.error('Error connecting to Socket.IO:', err);
      });
    }

    return () => {
      // Desconectar socket cuando se cierra sesión
      if (!isLoggedIn) {
        SocketService.disconnect();
      }
    };
  }, [isLoggedIn, userId, dispatch]);

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          dispatch(userActions.updatePushToken(token));
        }
      })
      .catch((error) => console.error('Error al obtener token de notificaciones:', error));

    // Configurar listener para notificaciones recibidas mientras la app está en primer plano
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      if (userId && notification) {
        // Añadir un timeout para evitar múltiples procesamientos
        setTimeout(() => {
          saveNotification(notification, userId)
            .then((savedNotification) => {
              if (savedNotification) {
                dispatch(notificationActions.saveNewNotification(savedNotification));
                dispatch(notificationActions.getNotificationsCount());
              }
            })
            .catch((error) => console.log('Error al procesar notificación recibida:', error));
        }, 300);
      }
    });

    // Configurar listener para interacciones del usuario con las notificaciones
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (userId && response && response.notification) {
        // Añadir un timeout para evitar múltiples procesamientos
        setTimeout(() => {
          saveNotification(response.notification, userId)
            .then((savedNotification) => {
              if (savedNotification) {
                dispatch(notificationActions.saveNewNotification(savedNotification));
                dispatch(notificationActions.getNotificationsCount());
              }
            })
            .catch((error) => console.log('Error al procesar respuesta de notificación:', error));
        }, 300);

        // Aquí puedes añadir lógica para navegar según el tipo de notificación
        // const notificationData = response.notification.request?.content?.data;
        // if (notificationData?.type) { /* Manejar navegación basada en el tipo */ }
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [dispatch, userId]);

  React.useEffect(() => {
    AsyncStorage.getItem('@user_session').then((user) => {
      if (user) {
        const userParsed = JSON.parse(user);
        dispatch(userActions.checkIfExistSession(userParsed));
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      {
      isLoggedIn
        ? <AppNavigator />
        : <AuthNavigator />
      }
    </NavigationContainer>
  );
}

export default AppRoute;
