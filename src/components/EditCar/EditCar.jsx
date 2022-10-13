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

import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
});

function EditCar({ route, navigation }) {
  const {
    marca, color, patente, modelo,
  } = route.params;

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
              <TextInput
                value={marca}
                placeholder="Ejemplo: Renault"
                placeholderTextColor="#D1D6DB"
              />
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Modelo</Text>
              <View style={{ marginVertical: 2 }} />
              <TextInput
                value={modelo}
                placeholder="Ejemplo: Clio"
                placeholderTextColor="#D1D6DB"
              />
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Patente</Text>
              <View style={{ marginVertical: 2 }} />
              <TextInput
                value={patente}
                placeholder="Ejemplo: Clio"
                placeholderTextColor="#D1D6DB"
              />
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Color</Text>
              <View style={{ marginVertical: 2 }} />
              <TextInput value={color} placeholder="Ejemplo: Clio" placeholderTextColor="#D1D6DB" />
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
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Guardar</Text>
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
