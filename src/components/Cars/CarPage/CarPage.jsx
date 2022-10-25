/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { carActions, userActions } from '../../../redux/actions';

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

function CarPage({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');
  const user = useSelector((state) => state.user.data);
  const [cars, setCars] = React.useState([]);
  const authUser = useSelector((state) => state.authentication.user);

  useEffect(() => {
    dispatch(userActions.getUser(authUser.id));
  }, [authUser.id, dispatch]);

  useEffect(() => {
    if (user) {
      const { favoriteCarId } = user;
      if (favoriteCarId) {
        const updatedCar = user.automoviles
          .map((car) => {
            if (car._id === favoriteCarId) {
              return { ...car, selected: true };
            }
            return { ...car, selected: false };
          })
          .sort((x, y) => (Number(y.selected) - Number(x.selected)));
        setCars(updatedCar);
      } else {
        setCars(user.automoviles);
      }
    }
  }, [user]);

  const onFavoriteCarPressed = (index) => {
    const newFavoriteCarId = cars[index]._id;
    dispatch(carActions.update({ favoriteCarId: newFavoriteCarId }));
    const updatedCar = user.automoviles
      .map((car) => {
        if (car._id === newFavoriteCarId) {
          return { ...car, selected: true };
        }
        return { ...car, selected: false };
      })
      .sort((x, y) => (Number(y.selected) - Number(x.selected)));
    setCars(updatedCar);
  };

  const onCarPressed = (index) => {
    navigation.navigate('EditCar', cars[index]);
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
        <Text style={{ fontSize: 18 }}>Mis autos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ManageCard')}>
          <Ionicons name="add" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <TextInput
        textAlign="center"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Buscar un auto"
      />
      <View style={{ flex: 1, marginVertical: 20, paddingHorizontal: 16 }}>
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity onPress={() => onCarPressed(index)}>
                <Text style={{ color: '#35424a', fontSize: 17, fontWeight: '400' }}>
                  {item.marca}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onFavoriteCarPressed(index)}>
                {item.selected ? (
                  <FontAwesome name="star" size={24} color="black" />
                ) : (
                  <FontAwesome name="star" size={24} color="#CCCCCC" />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default CarPage;
