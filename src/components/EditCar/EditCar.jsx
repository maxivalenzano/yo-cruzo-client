/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { carActions } from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
  textError: {
    color: 'red',
    marginLeft: 5,
  },
  textInput: {
    marginVertical: 10,
  },
});

function EditCar({ route, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.car.loading);
  const updated = useSelector((state) => state.car.updated);

  React.useEffect(() => {
    if (updated) {
      navigation.navigate('CarList');
    }
  }, [updated, navigation]);

  const {
    marca, color, patente, modelo, _id: idCar,
  } = route.params;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      marca, color, patente, modelo,
    },
  });

  const handleChange = async (data) => {
    const updatedCar = user?.automoviles?.map((car) => {
      if (car._id === idCar) {
        return { ...car, ...data };
      }
      return car;
    });
    console.log('🚀 ~ file: EditCar.jsx ~ line 53 ~ updatedCar ~ updatedCar', updatedCar);
    dispatch(carActions.update({ automoviles: updatedCar }));
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
      </View>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Editar Auto</Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Marca</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Marca"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Ejemplo: Renault"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="marca"
              />
              {errors.marca && <Text style={styles.textError}>{errors.marca.message}</Text>}
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Modelo</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Modelo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Ejemplo: Clio"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="modelo"
              />
              {errors.modelo && <Text style={styles.textError}>{errors.modelo.message}</Text>}
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Patente</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Patente"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="MSJ123"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="patente"
              />
              {errors.patente && <Text style={styles.textError}>{errors.patente.message}</Text>}
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Color</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Color"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Blanco"
                    placeholderTextColor="#D1D6DB"
                    style={styles.textInput}
                    value={value}
                    returnKeyType="next"
                  />
                )}
                name="color"
              />
              {errors.color && <Text style={styles.textError}>{errors.color.message}</Text>}
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  width: '80%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={handleSubmit(handleChange)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
              }}
            >
              <Text style={{ color: '#989EB1', fontSize: 17 }}>Eliminar Auto</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default EditCar;
