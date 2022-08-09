import authServices from '../services/authServices';

const signIn = (user) => {
  console.log('🚀 ~ file: authActions.js ~ line 4 ~ signIn ~ data', user);
  function success(login) {
    return { type: 'SIGN_IN', token: login };
  }
  return (dispatch) => {
    console.log('🚀 ~ file: authActions.js');
    authServices.signIn.then(
      (data) => {
        console.log('🚀 ~ file: actions.js ~ line 39 ~ .then ~ data', data);
        dispatch(success(data));
      },
      (err) => {
        console.error(err);
      }
    );
  };
};
const signOut = () => {
  function success() {
    return { type: 'SIGN_OUT' };
  }
  return (dispatch) => {
    dispatch(success());
  };
};

const signUp = (user) => {
  function success() {
    return { type: 'SIGN_UP', registered: true };
  }
  return (dispatch) => {
    authServices.signUp(user).then(
      (data) => {
        console.log('🚀 ~ file: actions.js ~ line 39 ~ .then ~ data', data);
        dispatch(success(data));
      },
      (err) => {
        console.error(err);
      }
    );
  };
};

const authActions = {
  signIn,
  signOut,
  signUp,
};

export default authActions;
