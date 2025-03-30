/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { carActions } from '../../../redux/actions';
import { validationConstants } from '../../../constants';
import Separator from '../../Controls/Separator';
import Container from '../../Commons/Container';
import HeaderBar from '../../Commons/HeaderBar';

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

function EditCar({ route, navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.car.loading);
  const updated = useSelector((state) => state.car.updated);
  const deleting = useSelector((state) => state.car.deleting);
  const deleted = useSelector((state) => state.car.deleted);

  React.useEffect(() => {
    if (updated || deleted) {
      navigation.navigate('CarList');
      dispatch(carActions.clean());
    }
  }, [updated, navigation, dispatch, deleted]);

  const {
    marca, color, patente, modelo, id,
  } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id,
      marca,
      color,
      patente,
      modelo,
    },
  });

  const handleChange = (data) => {
    dispatch(carActions.update(data));
  };

  const handleDeleteCar = () => {
    dispatch(carActions.deleteCar(id));
  };

  return (
    <Container>
      <HeaderBar title="Modifica tu auto" onGoBack={() => navigation.goBack()} />

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 16,
            color: '#c2c2c2',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          Actualiza la información de tu vehículo cuando lo necesites
        </Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Marca</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.marca}
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
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Modelo</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.modelo}
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
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Patente</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.patente}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Patente"
                    onBlur={onBlur}
                    onChangeText={(v) => onChange(v.trim())}
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
              <Separator />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Color</Text>
              <View style={{ marginVertical: 2 }} />
              <Controller
                control={control}
                rules={validationConstants.color}
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
              <Separator />
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
                disabled={loading}
                onPress={handleSubmit(handleChange)}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  {loading ? 'Guardando cambios...' : 'Guardar cambios'}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
                padding: 10,
              }}
              disabled={deleting}
              onPress={handleDeleteCar}
            >
              <Text style={{ color: '#F85F6A', fontSize: 17 }}>
                {deleting ? 'Eliminando auto...' : 'Eliminar este auto'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default EditCar;
