import { tripRequestConstants } from '../../constants';
import { tripRequestServices } from '../../services';
import alertActions from './alert.actions';

function getAllTripRequestForPassenger() {
  function request() { return { type: tripRequestConstants.GET_ALL_REQUEST }; }
  function success(trips) { return { type: tripRequestConstants.GET_ALL_SUCCESS, trips }; }
  function failure(error) { return { type: tripRequestConstants.GET_ALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripRequestServices.getAllTripRequestForPassenger()
      .then(
        (trips) => {
          dispatch(success(trips));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function createTripRequest(trip) {
  function request() { return { type: tripRequestConstants.CREATE_TRIP_REQUEST }; }
  function success(trips) { return { type: tripRequestConstants.CREATE_TRIP_SUCCESS, trips }; }
  function failure(error) { return { type: tripRequestConstants.CREATE_TRIP_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(trip));

    tripRequestServices.create(trip)
      .then(
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

function acceptRequest(requestId) {
  function request() { return { type: tripRequestConstants.ACCEPT_REQUEST }; }
  function success(response) { return { type: tripRequestConstants.ACCEPT_SUCCESS, response }; }
  function failure(error) { return { type: tripRequestConstants.ACCEPT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripRequestServices.acceptTripRequest(requestId)
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function rejectRequest(requestId) {
  function request() { return { type: tripRequestConstants.REJECT_REQUEST }; }
  function success(response) { return { type: tripRequestConstants.REJECT_SUCCESS, response }; }
  function failure(error) { return { type: tripRequestConstants.REJECT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripRequestServices.rejectTripRequest(requestId)
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function cancelRequest(requestId) {
  function request() { return { type: tripRequestConstants.CANCEL_REQUEST }; }
  function success(response) { return { type: tripRequestConstants.CANCEL_SUCCESS, response }; }
  function failure(error) { return { type: tripRequestConstants.CANCEL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripRequestServices.cancelTripRequest(requestId)
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getAllTripRequestForDriver() {
  function request() { return { type: tripRequestConstants.GET_DRIVER_REQUEST }; }
  function success(trips) { return { type: tripRequestConstants.GET_DRIVER_SUCCESS, trips }; }
  function failure(error) { return { type: tripRequestConstants.GET_DRIVER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripRequestServices.getAllTripRequestForDriver()
      .then(
        (trips) => {
          dispatch(success(trips));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

const getPassengerTrips = () => ({
  type: 'GET_PASSENGER_TRIPS_REQUEST',
});

const setPassengerTrips = (trips) => ({
  type: tripRequestConstants.SET_PASSENGER,
  payload: trips,
});

function clean() {
  return { type: tripRequestConstants.CLEAN };
}

const tripRequestActions = {
  clean,
  getAllTripRequestForPassenger,
  createTripRequest,
  getPassengerTrips,
  setPassengerTrips,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  getAllTripRequestForDriver,
};

export default tripRequestActions;
