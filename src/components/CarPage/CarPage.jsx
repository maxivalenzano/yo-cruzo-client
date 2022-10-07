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
import userActions from '../../redux/actions/user.actions';

const CARS2 = [
  {
    marca: 'Model 1',
    modelo: 'Chilo',
    _id: 'Chilo',
    selected: false,
    patente: 'XXX AAA DD',
    color: 'Mbarete',
  },
  {
    marca: 'Model 2',
    modelo: 'Focus',
    _id: 'Focus',
    selected: false,
    patente: 'XXX AAA 1',
    color: 'Puto',
  },
  {
    marca: 'Model 3',
    modelo: 'Corolla',
    _id: 'Corolla',
    selected: false,
    patente: 'XXX AAA 2',
    color: 'Rojo',
  },
  {
    marca: 'Model 4',
    modelo: 'Falcon',
    _id: 'Falcon',
    selected: false,
    patente: 'XXX AAA 3',
    color: 'Blanco',
  },
  {
    marca: 'Model 5',
    modelo: 'Etios',
    _id: 'Etios',
    selected: false,
    patente: 'XXX AAA 4',
  },
];

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

function CarPage({ navigation }) {
  const dispatch = useDispatch();
  const [text, onChangeText] = React.useState('');
  const user = useSelector((state) => state.user.data);
  const [cars, setCars] = React.useState([]);
  console.log('🚀 ~ file: CarPage.jsx ~ line 84 ~ CarPage ~ cars', cars);
  const authUser = useSelector((state) => state.authentication.user);
  console.log('🚀 ~ file: CarPage.jsx ~ line 81 ~ CarPage ~ user', user);

  useEffect(() => {
    if (!user) {
      dispatch(userActions.getUser(authUser.id));
    }
    if (user && !cars.length) {
      setCars(user.automoviles);
    }
  }, [authUser, user]);

  const onFavoriteCarPressed = (index) => {
    if (cars[index].selected) {
      const carsUpdated = JSON.parse(JSON.stringify(cars));
      carsUpdated[index].selected = false;
      return setCars(carsUpdated);
    }

    const carsUpdated = JSON.parse(JSON.stringify(cars));
    carsUpdated[index].selected = true;
    return setCars(carsUpdated);
  };

  const onCarPressed = (index) => {
    console.log('cars[index]', cars[index].marca);
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
          ItemSeparatorComponent={() => <View style={styles.separationLine} />}
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
