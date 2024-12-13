import { tripRequestConstants } from '../../constants';

const initialState = {
  trips: [],
  loading: false,
  created: false,
  error: false,
  passengerTrips: [],
};

function tripRequest(state = initialState, action = {}) {
  switch (action.type) {
    case tripRequestConstants.CREATE_TRIP_REQUEST:
      return { state, loading: true };
    case tripRequestConstants.CREATE_TRIP_SUCCESS:
      return { state, created: true };
    case tripRequestConstants.CREATE_TRIP_FAILURE:
      return { state, error: true };

    case tripRequestConstants.GET_ALL_REQUEST:
      return { state, loading: true };
    case tripRequestConstants.GET_ALL_SUCCESS:
      return { trips: action.trips };
    case tripRequestConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case tripRequestConstants.SET_PASSENGER:
      return { state, passengerTrips: action.payload };

    case tripRequestConstants.CLEAN:
      return {};

    default:
      return state;
  }
}

export default tripRequest;
