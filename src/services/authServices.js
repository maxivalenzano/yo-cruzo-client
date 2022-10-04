import axios from '../axios/axios';
import handler from '../helpers/handler';

const login = (data) => axios
  .post('/api/auth/signin', data)
  .then(handler.handleResponse)
  .catch(handler.handleError);

const register = (data) => axios
  .post('/api/auth/signup', data)
  .then(handler.handleResponse)
  .catch(handler.handleError);

const authServices = {
  login,
  register,
};

export default authServices;
