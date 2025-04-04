import { ratingConstants } from '../../constants';
import { ratingServices } from '../../services';
import alertActions from './alert.actions';

function rateDriver(tripId, ratingData) {
  function request() { return { type: ratingConstants.RATE_DRIVER_REQUEST }; }
  function success(rating) { return { type: ratingConstants.RATE_DRIVER_SUCCESS, rating }; }
  function failure(error) { return { type: ratingConstants.RATE_DRIVER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    ratingServices.rateDriver(tripId, ratingData)
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(alertActions.success('Calificación enviada con éxito'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getDriverRatings(driverId) {
  function request() { return { type: ratingConstants.GET_RATINGS_REQUEST }; }
  function success(ratings) { return { type: ratingConstants.GET_RATINGS_SUCCESS, ratings }; }
  function failure(error) { return { type: ratingConstants.GET_RATINGS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    ratingServices.getDriverRatings(driverId)
      .then(
        (ratings) => {
          dispatch(success(ratings));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function clearRatingStatus() {
  return { type: ratingConstants.CLEAR_RATING_STATUS };
}

const ratingActions = {
  rateDriver,
  getDriverRatings,
  clearRatingStatus,
};

export default ratingActions;
