import axios from '../axios/axios';
import handler from '../helpers/handler';

const getUser = (userId) => axios
  .get(`/api/user/${userId}`)
  .then(handler.handleResponse)
  .catch(handler.handleError);

const login = (data) => axios
  .post('/api/auth/signin', data)
  .then(handler.handleResponse)
  .catch(handler.handleError);

const register = (data) => axios
  .post('/api/auth/signup', data)
  .then(handler.handleResponse)
  .catch(handler.handleError);

const update = (data) => axios
  .put(`/api/user/${data.id}`, data)
  .then(handler.handleResponse)
  .catch(handler.handleError);

// Nuevo método para actualizar el token de notificaciones de un usuario
const updatePushToken = (userId, pushToken) => axios
  .post('/api/user/push-token', { userId, pushToken })
  .then(handler.handleResponse)
  .catch(handler.handleError);

// Nuevo método para actualizar el coche favorito de un usuario
const updateFavoriteCar = (userId, carId) => axios
  .post('/api/user/favorite-car', { userId, carId })
  .then(handler.handleResponse)
  .catch(handler.handleError);

const userServices = {
  login,
  getUser,
  register,
  update,
  updatePushToken,
  updateFavoriteCar,
};

export default userServices;
