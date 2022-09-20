import axios from '../axios/axios';

const signIn = (data) => axios.post('/api/auth/signin', data).then((response) => response.data);

const signUp = (data) => axios.post('/api/auth/signup', data).then((response) => response.data);

const authServices = {
  signIn,
  signUp,
};

export default authServices;
