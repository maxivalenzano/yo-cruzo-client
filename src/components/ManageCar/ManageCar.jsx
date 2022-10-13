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

const ITEMS = [
  { label: 'Patente', value: '', placeholder: 'Ejemplo: AA012BB' },
  { label: 'Marca', value: '', placeholder: 'Ejemplo: Renault' },
  { label: 'Modelo', value: '', placeholder: 'Ejemplo: Clio' },
  { label: 'Color', value: '', placeholder: 'Ejemplo: Blanco' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
});

function CarPage({ navigation }) {
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
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Cargar un nuevo auto</Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView>
            {ITEMS.map((item) => (
              <View key={item.label} style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.label}</Text>
                <View style={{ marginVertical: 2 }} />
                <TextInput
                  value={item.value}
                  placeholder={item.placeholder}
                  placeholderTextColor="#D1D6DB"
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
              </View>
            ))}

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
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  Finalizar registro
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default CarPage;
