import { tripConstants } from '../../constants';

function trip(state = {}, action) {
  switch (action.type) {
    case tripConstants.CREATE_REQUEST:
      return { trips: state.trips, loading: true };
    case tripConstants.CREATE_SUCCESS:
      return { trips: state.trips, created: true };
    case tripConstants.CREATE_FAILURE:
      return { error: action.error };

    case tripConstants.GET_REQUEST:
      return { loading: true };
    case tripConstants.GET_SUCCESS:
      return { data: action.trip };
    case tripConstants.GET_FAILURE:
      return { error: action.error };

    case tripConstants.GET_ALL_REQUEST:
      return { state, loading: true };
    case tripConstants.GET_ALL_SUCCESS:
      return { trips: action.trips };
    case tripConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case tripConstants.GET_TRIP_REQUEST:
      return { state, loading: true };
    case tripConstants.GET_TRIP_SUCCESS:
      return { trips: action.trips };
    case tripConstants.GET_TRIP_FAILURE:
      return { error: action.error };

    case tripConstants.UPDATE_REQUEST:
      return { trips: state.trips, loading: true };
    case tripConstants.UPDATE_SUCCESS:
      return { trips: state.trips, updated: true };
    case tripConstants.UPDATE_FAILURE:
      return { error: action.error };

    case tripConstants.DELETE_REQUEST:
      return { deleting: true };
    case tripConstants.DELETE_SUCCESS:
      return { trips: state.trips, deleted: true };
    case tripConstants.DELETE_FAILURE:
      return {};

    case tripConstants.CLEAN:
      return {};

    default:
      return state;
  }
}

export default trip;
