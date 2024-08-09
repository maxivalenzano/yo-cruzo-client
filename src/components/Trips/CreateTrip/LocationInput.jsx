/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Separator from '../../Controls/Separator';
import CustomGooglePlacesAutocomplete from '../../Controls/CustomGooglePlacesAutocomplete';

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
});

function LocationInput({
  control, name, rules, reference, onPress, onFail, error, label, withLabel,
}) {
  return (
    <View style={!!withLabel && { marginTop: 16 }}>
      {!!withLabel && (
        <>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</Text>
          <View style={{ marginVertical: 2 }} />
        </>
      )}
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <CustomGooglePlacesAutocomplete
            placeholder={withLabel ? 'Busca aquí' : label}
            onFail={() => onFail()}
            reference={reference}
            onPress={(data, details) => onPress(data, details, onChange)}
          />
        )}
        name={name}
        rules={rules}
      />
      {!!withLabel && <Separator />}
      {error && <Text style={styles.textError}>{error.message}</Text>}
    </View>
  );
}

export default LocationInput;
