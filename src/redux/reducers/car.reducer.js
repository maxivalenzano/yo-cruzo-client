import { carConstants } from '../../constants';

function car(state = {}, action) {
  switch (action.type) {
    case carConstants.CREATE_REQUEST:
      return { loading: true };
    case carConstants.CREATE_SUCCESS:
      return { createdCar: action.createdCar, created: true };
    case carConstants.CREATE_FAILURE:
      return { error: action.error };

    case carConstants.GET_REQUEST:
      return { loading: true };
    case carConstants.GET_SUCCESS:
      return { data: action.car };
    case carConstants.GET_FAILURE:
      return { error: action.error };

    case carConstants.GET_ALL_REQUEST:
      return { state, loading: true };
    case carConstants.GET_ALL_SUCCESS:
      return { cars: action.cars };
    case carConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case carConstants.UPDATE_REQUEST:
      return { loading: true };
    case carConstants.UPDATE_SUCCESS:
      return { data: action.updatedCar, updated: true };
    case carConstants.UPDATE_FAILURE:
      return { error: action.error };

    case carConstants.DELETE_REQUEST:
      return { deleting: true };
    case carConstants.DELETE_SUCCESS:
      return { };
    case carConstants.DELETE_FAILURE:
      return {};

    case carConstants.CLEAN:
      return {};

    default:
      return state;
  }
}

export default car;
