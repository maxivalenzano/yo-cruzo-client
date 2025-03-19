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
      return { ...state, loading: true };
    case tripRequestConstants.CREATE_TRIP_SUCCESS:
      return { ...state, created: true };
    case tripRequestConstants.CREATE_TRIP_FAILURE:
      return { ...state, error: true };

    case tripRequestConstants.GET_ALL_REQUEST:
      return { ...state, loading: true };
    case tripRequestConstants.GET_ALL_SUCCESS:
      return { trips: action.trips };
    case tripRequestConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case tripRequestConstants.SET_PASSENGER:
      return { ...state, passengerTrips: action.payload };

    case tripRequestConstants.ACCEPT_REQUEST:
      return { ...state, loading: true };
    case tripRequestConstants.ACCEPT_SUCCESS:
      return { ...state, accepted: true, loading: false };
    case tripRequestConstants.ACCEPT_FAILURE:
      return { ...state, error: true, loading: false };

    case tripRequestConstants.CANCEL_REQUEST:
      return { ...state, loading: true };
    case tripRequestConstants.CANCEL_SUCCESS:
      return { ...state, cancelled: true, loading: false };
    case tripRequestConstants.CANCEL_FAILURE:
      return { ...state, error: true, loading: false };

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
