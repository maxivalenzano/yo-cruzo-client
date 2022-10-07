import { userConstants } from '../../constants';
import { authServices, userServices } from '../../services';
import alertActions from './alert.actions';

function register(user) {
  function request() { return { type: userConstants.REGISTER_REQUEST }; }
  function success(userSuccess) { return { type: userConstants.REGISTER_SUCCESS, userSuccess }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    authServices.register(user)
      .then(
        () => {
          dispatch(success(user));
          dispatch(alertActions.info('Se ha enviado un link de confirmación de registro a su casilla'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function login(username, password) {
  function request() { return { type: userConstants.LOGIN_REQUEST }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    authServices.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getUser(userId) {
  function request() { return { type: userConstants.GET_REQUEST }; }
  function success(user) { return { type: userConstants.GET_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    userServices.getUser(userId)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function logout() {
  return { type: userConstants.LOGOUT };
}

function clear() {
  return { type: userConstants.CLEAR };
}

const userActions = {
  getUser,
  clear,
  login,
  logout,
  register,
};

export default userActions;
