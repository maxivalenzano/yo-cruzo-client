import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonTrip: {
    marginTop: 20,
    backgroundColor: '#f85f6a',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

function CityButton({ onPress, title, disabled }) {
  return (
    <TouchableOpacity
      style={styles.buttonTrip}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CityButton;
