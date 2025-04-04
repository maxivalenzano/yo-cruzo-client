import { userConstants } from '../../constants';
import { getCurrentUserId } from '../../helpers/authHelpers';
import userHelpers from '../../helpers/userHelpers';
import { userServices } from '../../services';
import alertActions from './alert.actions';
import { setCurrentUserId } from './chat.actions';

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

    userServices.register(user).then(
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

function login(dataLogin) {
  function request() { return { type: userConstants.LOGIN_REQUEST }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    userServices.login(dataLogin).then(
      (user) => {
        dispatch(success(user));
        userHelpers.saveSession(user);
        if (user && user.id) {
          dispatch(setCurrentUserId(user.id));
        }
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
    if (userSession && userSession.id) {
      dispatch(setCurrentUserId(userSession.id));
    }
  };
}

function updatePushToken(pushToken) {
  return async (dispatch) => {
    try {
      const storedToken = await userHelpers.getPushToken();

      // Si el token es diferente al almacenado, actualizar
      if (pushToken && pushToken !== storedToken) {
        const userId = getCurrentUserId();

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

// Nueva función para actualizar el coche favorito
function updateFavoriteCar(userId, carId) {
  function request() {
    return { type: userConstants.UPDATE_FAVORITE_CAR_REQUEST };
  }
  function success(updated) {
    return { type: userConstants.UPDATE_FAVORITE_CAR_SUCCESS, updated };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAVORITE_CAR_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    userServices.updateFavoriteCar(userId, carId).then(
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
  updateFavoriteCar,
};

export default userActions;
