/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, StatusBar, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { tripActions } from '../../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    backgroundColor: '#EEF0F2',
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 5,
  },
  separationLine: {
    height: 1,
    backgroundColor: '#D2DAE2',
    width: '100%',
  },
});

function ItemSeparatorComponent() {
  return <View style={styles.separationLine} />;
}

function TripPage({ navigation }) {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trip.trips);
  const loading = useSelector((state) => state.trip.loading);
  const [text, onChangeText] = React.useState('');

  const onRefresh = React.useCallback(() => {
    dispatch(tripActions.getAll());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(tripActions.getAll());
    }, [dispatch]),
  );

  const onTripPressed = (index) => {
    navigation.navigate('EditTrip', trips[index]);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>Mis viajes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTrip')}>
          <Ionicons name="add" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <TextInput
        textAlign="center"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Buscar un viaje"
      />
      <View style={{ flex: 1, marginVertical: 20, paddingHorizontal: 16 }}>
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />
          )}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity onPress={() => onTripPressed(index)}>
                <Text style={{ color: '#35424a', fontSize: 17, fontWeight: '400' }}>
                  {item.destination}
                  {' - '}
                  {dayjs(item.tripDate).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default TripPage;
