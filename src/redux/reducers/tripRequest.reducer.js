import { tripRequestConstants } from '../../constants';

const initialState = {
  trips: [],
  loading: false,
  created: false,
  error: false,
  passengerTrips: [],
  accepted: false,
  cancelled: false,
  driverTrips: [],
};

function tripRequest(state = initialState, action = {}) {
  switch (action.type) {
    case tripRequestConstants.CREATE_TRIP_REQUEST:
      return {
        ...state, loading: true, created: false, error: false,
      };
    case tripRequestConstants.CREATE_TRIP_SUCCESS:
      return {
        ...state, loading: false, created: true, error: false,
      };
    case tripRequestConstants.CREATE_TRIP_FAILURE:
      return {
        ...state, loading: false, created: false, error: true,
      };

    case tripRequestConstants.GET_ALL_REQUEST:
      return { ...state, loading: true, error: false };
    case tripRequestConstants.GET_ALL_SUCCESS:
      return { trips: action.trips, loading: false };
    case tripRequestConstants.GET_ALL_FAILURE:
      return { error: action.error, loading: false };

    case tripRequestConstants.SET_PASSENGER:
      return { ...state, passengerTrips: action.payload };

    case tripRequestConstants.ACCEPT_REQUEST:
      return {
        ...state, loading: true, accepted: false, error: false,
      };
    case tripRequestConstants.ACCEPT_SUCCESS:
      return {
        ...state, loading: false, accepted: true, error: false,
      };
    case tripRequestConstants.ACCEPT_FAILURE:
      return {
        ...state, loading: false, accepted: false, error: true,
      };

    case tripRequestConstants.CANCEL_REQUEST:
    case tripRequestConstants.REJECT_REQUEST:
      return {
        ...state, loading: true, cancelled: false, error: false,
      };
    case tripRequestConstants.CANCEL_SUCCESS:
    case tripRequestConstants.REJECT_SUCCESS:
      return {
        ...state, loading: false, cancelled: true, error: false,
      };
    case tripRequestConstants.CANCEL_FAILURE:
    case tripRequestConstants.REJECT_FAILURE:
      return {
        ...state, loading: false, cancelled: false, error: true,
      };

    case tripRequestConstants.GET_DRIVER_REQUEST:
      return { ...state, loading: true };
    case tripRequestConstants.GET_DRIVER_SUCCESS:
      return { ...state, driverTrips: action.trips, loading: false };
    case tripRequestConstants.GET_DRIVER_FAILURE:
      return { ...state, error: action.error, loading: false };

    case tripRequestConstants.CLEAN:
      return {};

    default:
      return state;
  }
}

export default tripRequest;
