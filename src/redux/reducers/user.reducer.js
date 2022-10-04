import { userConstants } from '../../constants';

function user(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return { creating: true };
    case userConstants.CREATE_SUCCESS:
      return { createdUser: action.createdUser };
    case userConstants.CREATE_FAILURE:
      return { error: action.error };

    case userConstants.GET_REQUEST:
      return { getting: true };
    case userConstants.GET_SUCCESS:
      return { data: action.user };
    case userConstants.GET_FAILURE:
      return { error: action.error };

    case userConstants.GET_ALL_REQUEST:
      return { getting: true };
    case userConstants.GET_ALL_SUCCESS:
      return { users: action.users };
    case userConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case userConstants.UPDATE_REQUEST:
      return { updating: true };
    case userConstants.UPDATE_SUCCESS:
      return { data: action.updatedUser };
    case userConstants.UPDATE_FAILURE:
      return { error: action.error };

    case userConstants.DELETE_REQUEST:
      return { deleting: true };
    case userConstants.DELETE_SUCCESS:
      return { };
    case userConstants.DELETE_FAILURE:
      return {};

    case userConstants.UPDATE_PASSWORD_REQUEST:
      return { updating_password: true };
    case userConstants.UPDATE_PASSWORD_SUCCESS:
      return { password_updated: true };
    case userConstants.UPDATE_PASSWORD_FAILURE:
      return { updating_password: false };

    case userConstants.CREATE_BULK_REQUEST:
      return { creating: true };
    case userConstants.CREATE_BULK_SUCCESS:
      return { bulkCreationPreviewResult: action.bulkCreationPreviewResult };
    case userConstants.CREATE_BULK_FAILURE:
      return { error: action.error };

    case userConstants.CONFIRM_CREATE_BULK_REQUEST:
      return { ...state, confirming: true };
    case userConstants.CONFIRM_CREATE_BULK_SUCCESS:
      return { bulkCreationPreviewResult: null };
    case userConstants.CONFIRM_CREATE_BULK_FAILURE:
      return { error: action.error };

    default:
      return state;
  }
}

export default user;
