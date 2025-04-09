import { tripConstants } from '../../constants';
import { tripServices } from '../../services';
import alertActions from './alert.actions';

function create(trip) {
  function request() { return { type: tripConstants.CREATE_REQUEST }; }
  function success(trips) { return { type: tripConstants.CREATE_SUCCESS, trips }; }
  function failure(error) { return { type: tripConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(trip));

    tripServices.create(trip)
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

function get(id) {
  function request() { return { type: tripConstants.GET_REQUEST }; }
  function success(trip) { return { type: tripConstants.GET_SUCCESS, trip }; }
  function failure(error) { return { type: tripConstants.GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.get(id)
      .then(
        (trip) => {
          dispatch(success(trip));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getAll() {
  function request() { return { type: tripConstants.GET_ALL_REQUEST }; }
  function success(trips) { return { type: tripConstants.GET_ALL_SUCCESS, trips }; }
  function failure(error) { return { type: tripConstants.GET_ALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.getAll()
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

function update(trip) {
  function request() { return { type: tripConstants.UPDATE_REQUEST }; }
  function success(trips) { return { type: tripConstants.UPDATE_SUCCESS, trips }; }
  function failure(error) { return { type: tripConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(trip));

    tripServices.update(trip)
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

function deleteTrip(idTrip) {
  function request() { return { type: tripConstants.DELETE_REQUEST }; }
  function success() { return { type: tripConstants.DELETE_SUCCESS }; }
  function failure(error) { return { type: tripConstants.DELETE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.deleteTrip(idTrip)
      .then(
        (response) => {
          dispatch(success());
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(alertActions.error(error));
          dispatch(failure(error));
        },
      );
  };
}

function getTripByCity(city, params) {
  function request() { return { type: tripConstants.GET_TRIP_REQUEST }; }
  function success(trips) { return { type: tripConstants.GET_TRIP_SUCCESS, trips, params }; }
  function failure(error) { return { type: tripConstants.GET_TRIP_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.getTripByCity(city)
      .then(
        (trip) => {
          dispatch(success(trip));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getNearbyTrips(location, params = {}) {
  function request() { return { type: tripConstants.GET_TRIP_REQUEST }; }
  function success(trips) { return { type: tripConstants.GET_TRIP_SUCCESS, trips, params }; }
  function failure(error) { return { type: tripConstants.GET_TRIP_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    const { lat, lng } = location;
    const { date } = params;

    tripServices.getNearbyTrips(lat, lng, 10000, 'destination', 'OPEN', date)
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

function startTrip(tripId) {
  function request() { return { type: tripConstants.START_REQUEST }; }
  function success(trip) { return { type: tripConstants.START_SUCCESS, trip }; }
  function failure(error) { return { type: tripConstants.START_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.startTrip(tripId)
      .then(
        (response) => {
          dispatch(success(response.trip));
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function completeTrip(tripId) {
  function request() { return { type: tripConstants.COMPLETE_REQUEST }; }
  function success(trip) { return { type: tripConstants.COMPLETE_SUCCESS, trip }; }
  function failure(error) { return { type: tripConstants.COMPLETE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.completeTrip(tripId)
      .then(
        (response) => {
          dispatch(success(response.trip));
          dispatch(alertActions.success(response.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getDriverTripsByStatus(status = 'ALL') {
  function request() { return { type: tripConstants.GET_DRIVER_TRIPS_REQUEST }; }
  function success(trips) { return { type: tripConstants.GET_DRIVER_TRIPS_SUCCESS, trips }; }
  function failure(error) { return { type: tripConstants.GET_DRIVER_TRIPS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    tripServices.getDriverTripsByStatus(status)
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

function clean() {
  return { type: tripConstants.CLEAN };
}

const tripActions = {
  create,
  clean,
  get,
  getAll,
  getTripByCity,
  getNearbyTrips,
  update,
  deleteTrip,
  startTrip,
  completeTrip,
  getDriverTripsByStatus,
};

export default tripActions;
