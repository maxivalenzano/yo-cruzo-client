import axios from 'axios';
import { API_URL } from '../config';
import { userHelpers } from '../helpers';

const X_ACCESS_TOKEN = 'x-access-token';

export const headersBase = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  [X_ACCESS_TOKEN]: '',
};

const instance = axios.create({
  baseURL: API_URL,
  headers: headersBase,
});

// Función para establecer el token de autenticación en las cabeceras
const setAuthToken = async (config) => {
  try {
    const user = await userHelpers.getSessionFromStorage();
    if (user?.accessToken) {
      config.headers[X_ACCESS_TOKEN] = user.accessToken;
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
  return config;
};

// Interceptor de solicitud
instance.interceptors.request.use(
  async (config) => await setAuthToken(config),
  (error) => Promise.reject(error),
);

// Interceptor de respuesta
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log('🚀 ~ error.response:', error.response);
    // Si el error es 401 (No autorizado), puede significar que el token expiró
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Aquí podrías implementar la renovación del token si es necesario
        // Por ahora, solo maneja el cierre de sesión
        userHelpers.logout();
        // También podrías redirigir al usuario a la página de inicio de sesión
      } catch (refreshError) {
        console.error('Error al renovar la sesión:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
