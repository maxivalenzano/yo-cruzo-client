import dispatch from './dispatch';
import { userConstants } from '../constants';

function logout() {
  return { type: userConstants.LOGOUT };
}

function handleResponse(response) {
  return response.data;
}

function handleError(error) {
  let message = '';
  if (error.response) {
    console.log('🚀 ~ file: handler.js ~ line 17 ~ handleError ~ error.response', error.response);
    if (error.response.status === 401) {
      dispatch(logout());
    }

    if (error.response.status === 500) {
      message = `Ops error: ${error.response.status}`;
    } else {
      message = error.response?.data?.message;
    }
  } else {
    message = 'Ops error';
  }

  return Promise.reject(message);
}

const handler = {
  logout,
  handleResponse,
  handleError,
};

export default handler;
