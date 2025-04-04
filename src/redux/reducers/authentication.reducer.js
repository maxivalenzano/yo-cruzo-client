import { userConstants } from '../../constants';

function authentication(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { loggingIn: true };
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case userConstants.LOGIN_FAILURE:
      return { error: true };

    case userConstants.REGISTER_REQUEST:
      return { registration: true };
    case userConstants.REGISTER_SUCCESS:
      return { registered: true, user: action.userSuccess };
    case userConstants.REGISTER_FAILURE:
      return { error: true };

    case userConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}

export default authentication;
