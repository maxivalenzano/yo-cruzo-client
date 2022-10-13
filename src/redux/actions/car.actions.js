import { carConstants } from '../../constants';
import userHelpers from '../../helpers/userHelpers';
import { carServices } from '../../services';
import alertActions from './alert.actions';
import userActions from './user.actions';

function create(car) {
  const user = userHelpers.getCurrentSession();

  function request() { return { type: carConstants.CREATE_REQUEST }; }
  function success(createdCar) { return { type: carConstants.CREATE_SUCCESS, createdCar }; }
  function failure(error) { return { type: carConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(car));

    carServices.create(car)
      .then(
        (createdCar) => {
          dispatch(success(createdCar));
          dispatch(userActions.getUser(user.id));
        },
        (error) => {
          dispatch(failure(error));
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
        },
      );
  };
}

function update(car) {
  const user = userHelpers.getCurrentSession();
  console.log('🚀 ~ file: car.actions.js ~ line 73 ~ update ~ user', user);

  function request() { return { type: carConstants.UPDATE_REQUEST }; }
  function success(updatedCar) { return { type: carConstants.UPDATE_SUCCESS, updatedCar }; }
  function failure(error) { return { type: carConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(car));

    carServices.update(car)
      .then(
        (updatedCar) => {
          dispatch(success(updatedCar));
          dispatch(userActions.getUser(user.id));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function deleteCar(carId) {
  function request() { return { type: carConstants.DELETE_REQUEST }; }
  function success() { return { type: carConstants.DELETE_SUCCESS }; }
  function failure() { return { type: carConstants.DELETE_FAILURE }; }

  return (dispatch) => {
    dispatch(request());

    carServices.deleteCar(carId)
      .then(
        () => {
          dispatch(success());
        },
        (error) => {
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
