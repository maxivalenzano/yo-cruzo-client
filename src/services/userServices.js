import axios from '../axios/axios';
import handler from '../helpers/handler';

const getUser = (userId) => axios
  .get(`/api/user/${userId}`)
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

const authServices = {
  getUser,
  register,
  update,
};

export default authServices;
