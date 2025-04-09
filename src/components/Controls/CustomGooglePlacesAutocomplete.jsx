/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
});

function CustomGooglePlacesAutocomplete({
  placeholder, reference, onPress, onFail,
}) {
  return (
    <GooglePlacesAutocomplete
      disableScroll
      ref={reference}
      onPress={onPress}
      onFail={onFail}
      placeholder={placeholder}
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
        location: '-27.464197, -58.887473',
        radius: '30000',
        strictbounds: true,
      }}
      filterReverseGeocodingByTypes={['street_address', 'geocode']}
      renderDescription={(row) => {
        const { terms } = row;
        const street = terms[0]?.value || '';
        const city = terms[1]?.value || '';
        return `${street}, ${city}`;
      }}
      styles={GooglePlacesStyles}
      debounce={200}
      enablePoweredByContainer={false}
    />
  );
}

export default CustomGooglePlacesAutocomplete;
