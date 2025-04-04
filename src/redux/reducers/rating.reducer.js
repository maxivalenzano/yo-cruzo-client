import { ratingConstants } from '../../constants';

const initialState = {
  loading: false,
  submitted: false,
  error: null,
  driverRatings: null,
};

function rating(state = initialState, action = {}) {
  switch (action.type) {
    case ratingConstants.RATE_DRIVER_REQUEST:
      return {
        ...state,
        loading: true,
        submitted: false,
        error: null,
      };
    case ratingConstants.RATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        submitted: true,
        error: null,
      };
    case ratingConstants.RATE_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        submitted: false,
        error: action.error,
      };

    case ratingConstants.GET_RATINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ratingConstants.GET_RATINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        driverRatings: action.ratings,
      };
    case ratingConstants.GET_RATINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case ratingConstants.CLEAR_RATING_STATUS:
      return {
        ...state,
        submitted: false,
        error: null,
      };

    default:
      return state;
  }
}

export default rating;
