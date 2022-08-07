const initialState = {
  isLoading: false,
  isSignOut: false,
  userToken: null,
};

export default function reducer(prevState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...prevState, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...prevState, isSignOut: false, userToken: action.token };
    case 'SIGN_OUT':
      return { ...prevState, isSignOut: true, userToken: null };
    case 'SIGN_UP':
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
        registered: true,
      };
    default:
      return initialState;
  }
}
