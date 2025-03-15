import { alertConstants } from '../../constants';

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function info(message) {
  return { type: alertConstants.INFO, message };
}

function warning(message) {
  return { type: alertConstants.WARNING, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message: (message?.message || message) };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

const alertActions = {
  success,
  info,
  warning,
  error,
  clear,
};

export default alertActions;
