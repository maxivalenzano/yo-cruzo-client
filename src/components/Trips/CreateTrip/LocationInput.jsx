/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Separator from '../../Controls/Separator';

function ListEmptyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <Text>No se encontraron resultados</Text>
    </View>
  );
}
const GooglePlacesStyles = {
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  description: { color: 'black' },
  listView: { color: 'black', zIndex: 100000 }, // does nt work, text is still white?
};

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 5,
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
          <GooglePlacesAutocomplete
            disableScroll
            ref={reference}
            onPress={(data, details) => onPress(data, details, onChange)}
            onFail={() => onFail()}
            placeholder={withLabel ? 'Busca aquí' : label}
            fetchDetails
            keyboardShouldPersistTaps="always"
            minLength={3}
            returnKeyType="search"
            textInputProps={{
              returnKeyType: 'search',
              style: styles.textInput,
              placeholderTextColor: '#D1D6DB',
            }}
            query={{
              key: 'AIzaSyCDdOit0z643cb7uDBVZgKmKNKRQ3W6OiQ',
              language: 'es-419',
              components: 'country:ar',
              // types: '(cities)',
              // location: '-27.451248,-58.986743,-27.471010,-58.830825',
              // radius: '50000',
              // strictbounds: true,
            }}
            filterReverseGeocodingByTypes={['street_address', 'geocode']}
            listEmptyComponent={ListEmptyComponent}
            styles={GooglePlacesStyles}
            debounce={200}
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
