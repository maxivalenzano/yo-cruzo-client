import { carConstants } from '../../constants';
import { carServices } from '../../services';
import alertActions from './alert.actions';
import userActions from './user.actions';
import { getCurrentUserId } from '../../helpers/authHelpers';

function create(car) {
  const userId = getCurrentUserId();

  function request() { return { type: carConstants.CREATE_REQUEST }; }
  function success(createdCar) { return { type: carConstants.CREATE_SUCCESS, createdCar }; }
  function failure(error) { return { type: carConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(car));

    carServices.create(car)
      .then(
        (response) => {
          dispatch(success(response.data));
          dispatch(alertActions.success(response.message));
          dispatch(userActions.getUser(userId));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function get(id) {
  function request() { return { type: carConstants.GET_REQUEST }; }
  function success(car) { return { type: carConstants.GET_SUCCESS, car }; }
  function failure(error) { return { type: carConstants.GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    carServices.get(id)
      .then(
        (car) => {
          dispatch(success(car));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getAll() {
  function request() { return { type: carConstants.GET_ALL_REQUEST }; }
  function success(cars) { return { type: carConstants.GET_ALL_SUCCESS, cars }; }
  function failure(error) { return { type: carConstants.GET_ALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    carServices.getAll()
      .then(
        (cars) => {
          dispatch(success(cars));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function update(car) {
  const userId = getCurrentUserId();

  function request() { return { type: carConstants.UPDATE_REQUEST }; }
  function success(updatedCar) { return { type: carConstants.UPDATE_SUCCESS, updatedCar }; }
  function failure(error) { return { type: carConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(car));

    carServices.update(car)
      .then(
        (response) => {
          dispatch(success(response.data));
          dispatch(alertActions.success(response.message));
          dispatch(userActions.getUser(userId));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function deleteCar(idCar) {
  const userId = getCurrentUserId();

  function request() { return { type: carConstants.DELETE_REQUEST }; }
  function success() { return { type: carConstants.DELETE_SUCCESS }; }
  function failure(error) { return { type: carConstants.DELETE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    carServices.deleteCar(idCar)
      .then(
        (response) => {
          dispatch(success());
          dispatch(alertActions.success(response.message));
          dispatch(userActions.getUser(userId));
        },
        (error) => {
          dispatch(alertActions.error(error));
          dispatch(failure(error));
        },
      );
  };
}

function clean() {
  return { type: carConstants.CLEAN };
}

const carActions = {
  create,
  clean,
  get,
  getAll,
  update,
  deleteCar,
};

export default carActions;
