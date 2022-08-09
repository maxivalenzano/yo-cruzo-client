import axios from '../axios/axios';

const signIn = (data) => {
  console.log('🚀 ~ file: authServices.js ~ line 4 ~ signIn ~ data', data);
  return axios.post('/api/auth/signin', data).then((response) => response.data);
  // .catch((err) => {
  //   console.error(err);
  //   return err.response;
  // });
};

const signUp = (data) => {
  console.log('🚀 ~ file: authServices.js ~ line 14 ~ signUp ~ data', data);
  return axios.post('/api/auth/signup', data).then((response) => response.data);
  // .catch((err) => {
  //   console.error(err);
  //   return err.response;
  // });
};

const authServices = {
  signIn,
  signUp,
};

export default authServices;
