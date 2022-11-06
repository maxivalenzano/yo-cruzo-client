import dispatch from './dispatch';
import { userConstants } from '../constants';

function logout() {
  return { type: userConstants.LOGOUT };
}

function handleResponse(response) {
  return response.data;
}

function handleError(error) {
  let message = 'Ops error';
  if (error.response) {
    console.log('🚀 ~ file: handler.js ~ line 17 ~ handleError ~ error.response', error.response);
    if (error.response.status === 401) {
      dispatch(logout());
    }

    message = error.response?.data?.message || error.response?.data?.error || message;
  }
  return Promise.reject(message);
}

const handler = {
  logout,
  handleResponse,
  handleError,
};

export default handler;
