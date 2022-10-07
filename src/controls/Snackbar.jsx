import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    color: 'white',
  },
  snackbar: {
    backgroundColor: '#ff0033',
    width: '98%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '1%',
    marginRight: '1%',
    marginBottom: 0,
    padding: 0,
  },
});

function SnackBar() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleCloseAlert = () => {
    dispatch(alertActions.clear());
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {alert.message && (
      <Snackbar
        style={styles.container}
        visible
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

      )}
    </>
  );
}

export default SnackBar;
