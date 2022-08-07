import axios from '../axios/axios';

const signIn = (data) => {
  console.log('🚀 ~ file: authServices.js ~ line 4 ~ signIn ~ data', data);
  function success(login) {
    return { type: 'SIGN_IN', token: login };
  }
  return (dispatch) => {
    console.log('🚀 ~ file: authServices.js');
    axios
      .post('/api/auth/signin', data)
      .then((response) => {
        console.log('🚀 ~ file: authServices.js ~ line 12 ~ .then ~ response.data', response.data);
        if (response.data?.accessToken) {
          dispatch(success(response.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
const signOut = () => {
  function success() {
    return { type: 'SIGN_OUT' };
  }
  return (dispatch) => {
    dispatch(success());
  };
};

const signUp = (data) => {
  function success() {
    return { type: 'SIGN_UP', registered: true };
  }
  return (dispatch) => {
    axios
      .post('/api/auth/signup', data)
      .then((response) => {
        if (response.data) {
          dispatch(success(response.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const authServices = {
  signIn,
  signOut,
  signUp,
};

export default authServices;
