import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { calculateEstimatedPrice } from '../../../helpers/distanceHelpers';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 16,
    paddingBottom: 26,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 16,
    color: '#F85F6A',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#989EB1',
    marginTop: 4,
  },
});

const defaultPaymentMethods = ['Efectivo', 'Transferencia'];

function TripPrice({ trip, elementMaps }) {
  // Métodos de pago
  const paymentMethods = (trip?.paymentMethod?.length ? trip.paymentMethod : defaultPaymentMethods).join(' , ');

  // Cálculo de distancia
  const distanceKm = useMemo(() => (elementMaps?.distance?.value || 0) / 1000, [elementMaps]);

  // Cálculo del precio estimado
  const estimatedPrice = useMemo(() => {
    const price = calculateEstimatedPrice(elementMaps?.distance?.value || 0);
    const formattedPrice = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(trip.price || price);
    return formattedPrice;
  }, [elementMaps?.distance?.value, trip.price]);

  return (
    <View style={styles.container}>
      {/* Precio estimado */}
      <View style={styles.row}>
        <Text style={styles.labelText}>Precio estimado del viaje:</Text>
        <Text style={styles.valueText}>{estimatedPrice}</Text>
      </View>

      {/* Distancia */}
      <View style={styles.row}>
        <Text style={styles.labelText}>Distancia:</Text>
        <Text style={styles.valueText}>
          {distanceKm.toFixed(1)}
          {' '}
          km
        </Text>
      </View>

      {/* Métodos de pago */}
      <Text style={styles.subText}>Métodos de pago aceptados:</Text>
      <Text style={styles.subText}>{paymentMethods}</Text>
    </View>
  );
}

export default TripPrice;
