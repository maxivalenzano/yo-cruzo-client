import { tripConstants } from '../../constants';

function trip(state = {}, action = {}) {
  switch (action.type) {
    case tripConstants.CREATE_TRIP_REQUEST:
      return { trips: state.trips, loading: true };
    case tripConstants.CREATE_TRIP_SUCCESS:
      return { trips: state.trips, created: true };
    case tripConstants.CREATE_TRIP_FAILURE:
      return { };

    case tripConstants.CLEAN:
      return {};

    default:
      return state;
  }
}

export default trip;
