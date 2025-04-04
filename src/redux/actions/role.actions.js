import roleConstants from '../../constants/role.constants';

const setRole = (isDriver) => ({
  type: roleConstants.SET_ROLE,
  payload: isDriver,
});

const roleActions = {
  setRole,
};

export default roleActions;
