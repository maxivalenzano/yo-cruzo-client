import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../redux/actions';

const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red',
    color: 'white',
  },
  info: {
    backgroundColor: 'blue',
    color: 'white',
  },
  success: {
    backgroundColor: 'green',
    color: 'white',
  },
  warning: {
    backgroundColor: 'orange',
    color: 'white',
  },
});

function SnackBar() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleCloseAlert = () => {
    dispatch(alertActions.clear());
  };

  const alertTypeMapping = {
    error: styles.error,
    info: styles.info,
    success: styles.success,
    warning: styles.warning,
  };

  return (
    <Snackbar
      style={alertTypeMapping[alert.type]}
      visible={alert.message}
      onDismiss={handleCloseAlert}
      duration={3000}
      theme={{ colors: { accent: 'white' } }}
      action={{
        label: 'Ok',
        onPress: handleCloseAlert,
      }}
    >
      {alert.message}
    </Snackbar>
  );
}

export default SnackBar;
