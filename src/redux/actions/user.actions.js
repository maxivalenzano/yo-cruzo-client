import { userConstants } from '../../constants';
import userHelpers from '../../helpers/userHelpers';
import { authServices, userServices } from '../../services';
import alertActions from './alert.actions';

function register(user) {
  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(userSuccess) {
    return { type: userConstants.REGISTER_SUCCESS, userSuccess };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    authServices.register(user).then(
      () => {
        dispatch(success(user));
        dispatch(alertActions.success('El usuario se registró correctamente'));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };
}

function login(username, password) {
  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    authServices.login(username, password).then(
      (user) => {
        dispatch(success(user));
        userHelpers.saveSession(user);
      },
      (error) => {
        dispatch(alertActions.error(error));
        dispatch(failure(error));
      },
    );
  };
}

function checkIfExistSession(userSession) {
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  return (dispatch) => {
    dispatch(success(userSession));
  };
}

function updatePushToken(pushToken) {
  return async (dispatch) => {
    try {
      const storedToken = await userHelpers.getPushToken();

      // Si el token es diferente al almacenado, actualizar
      if (pushToken && pushToken !== storedToken) {
        const userId = userHelpers.getCurrentSession()?.id;

        if (userId) {
          userServices.updatePushToken(userId, pushToken).then(
            (response) => {
              console.log('Token de notificaciones actualizado:', response);
              // Guardar el nuevo token en localStorage
              userHelpers.savePushToken(pushToken);
            },
            (error) => {
              console.error('Error al actualizar token de notificaciones:', error);
              dispatch(alertActions.error('Error al actualizar token de notificaciones'));
            },
          );
        }
      }
    } catch (error) {
      console.error('Error en updatePushToken:', error);
    }
  };
}

function getUser(userId) {
  function request() {
    return { type: userConstants.GET_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    userServices.getUser(userId).then(
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

function update(user) {
  function request() {
    return { type: userConstants.UPDATE_REQUEST };
  }
  function success(updated) {
    return { type: userConstants.UPDATE_SUCCESS, updated };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(user));

    userServices.update(user).then(
      (response) => {
        dispatch(success(response.data));
        dispatch(alertActions.success(response.message));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };
}

function clean() {
  return { type: userConstants.CLEAR };
}

function cleanUpdate() {
  return { type: userConstants.CLEAR_UPDATE };
}

const userActions = {
  getUser,
  clean,
  cleanUpdate,
  login,
  register,
  update,
  checkIfExistSession,
  updatePushToken,
};

export default userActions;
