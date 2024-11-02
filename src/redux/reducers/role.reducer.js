import roleConstants from '../../constants/role.constants';

const initialState = {
  isDriver: false,
};

function roleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case roleConstants.SET_ROLE:
      return {
        ...state,
        isDriver: action.payload,
      };
    default:
      return state;
  }
}

export default roleReducer;
