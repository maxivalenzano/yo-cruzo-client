import { tripRequestConstants } from '../../constants';
import { tripRequestServices } from '../../services';
import alertActions from './alert.actions';

function getAll() {
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
  getAll,
  createTripRequest,
  getPassengerTrips,
  setPassengerTrips,
};

export default tripRequestActions;
