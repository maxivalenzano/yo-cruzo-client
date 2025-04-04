/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EEF0F2',
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 5,
  },
  separationLine: {
    backgroundColor: '#D2DAE2',
    width: '100%',
    marginVertical: 8,
  },
});

export function ItemSeparatorComponent() {
  return <View style={styles.separationLine} />;
}

function CarPage({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const authUser = useSelector((state) => state.authentication.user);
  const loading = useSelector((state) => state.user.getting);
  const [text, onChangeText] = React.useState('');
  const [cars, setCars] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    dispatch(userActions.getUser(authUser.id));
  }, [dispatch, authUser.id]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userActions.getUser(authUser.id));
    }, [dispatch, authUser.id]),
  );

  useEffect(() => {
    if (user) {
      const { favoriteCarId } = user;
      if (favoriteCarId) {
        const updatedCar = user.cars
          .map((car) => {
            if (car.id === favoriteCarId) {
              return { ...car, selected: true };
            }
            return { ...car, selected: false };
          })
          .sort((x, y) => Number(y.selected) - Number(x.selected));
        setCars(updatedCar);
      } else {
        setCars(user.cars);
      }
    }
  }, [user]);

  const onFavoriteCarPressed = (index) => {
    const newFavoriteCarId = cars[index].id;
    dispatch(userActions.updateFavoriteCar(authUser.id, newFavoriteCarId));
    const updatedCar = user.cars.map((car) => {
      if (car.id === newFavoriteCarId) {
        return { ...car, selected: true };
      }
      return { ...car, selected: false };
    });
    setCars(updatedCar);
  };

  const onCarPressed = (index) => {
    navigation.navigate('EditCar', cars[index]);
  };

  return (
    <Container>
      <HeaderBar
        title="Mis vehículos"
        onGoBack={() => navigation.goBack()}
        rightIcon="add"
        onRightPress={() => navigation.navigate('ManageCard')}
      />

      <TextInput
        textAlign="center"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Buscar entre mis vehículos"
      />
      <View style={{ flex: 1, marginVertical: 20, paddingHorizontal: 16 }}>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
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
    </Container>
  );
}

export default CarPage;
