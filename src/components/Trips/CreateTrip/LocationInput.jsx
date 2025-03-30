/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Separator from '../../Controls/Separator';
import CustomGooglePlacesAutocomplete from '../../Controls/CustomGooglePlacesAutocomplete';

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
});

function LocationInput({
  value, onChange, reference, onPress, onFail, error, label, withLabel,
}) {
  return (
    <View style={!!withLabel && { marginTop: 16 }}>
      {!!withLabel && (
        <>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</Text>
          <View style={{ marginVertical: 2 }} />
        </>
      )}
      <CustomGooglePlacesAutocomplete
        placeholder={withLabel ? 'Escribe para buscar' : label}
        onFail={() => onFail()}
        reference={reference}
        onPress={(data, details) => onPress(data, details, onChange)}
        value={value?.description || ''} // Mostrar la descripción seleccionada si existe
      />
      {!!withLabel && <Separator />}
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
}

export default LocationInput;
