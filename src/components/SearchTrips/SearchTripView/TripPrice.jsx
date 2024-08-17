import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  content: {
    padding: 10,
    paddingTop: 16,
    paddingBottom: 26,
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#F85F6A',
  },
  distancePriceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentText: {
    marginTop: 10,
    fontSize: 13,
    color: '#989EB1',
    // textAlign: 'center',
  },
});

function calculateEstimatedPrice(
  distanceMeters,
  fuelConsumption = 0.08,
  fuelPrice = 1300,
  toll = 1000,
  profitPercentage = 0.25,
) {
  const distanceKm = distanceMeters / 1000;
  const fuelCost = distanceKm * fuelConsumption * fuelPrice;
  const driverProfit = fuelCost * profitPercentage;
  return fuelCost + toll + driverProfit;
}

function TripPrice({ trip, elementMaps }) {
  const distanceKm = useMemo(() => (elementMaps?.distance?.value || 0) / 1000, [elementMaps]);

  const estimatedPrice = useMemo(() => {
    const price = calculateEstimatedPrice(elementMaps?.distance?.value || 0);
    const formattedPrice = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
    return formattedPrice;
  }, [elementMaps]);

  return (
    <View style={styles.content}>
      <View style={styles.distancePriceContainer}>
        <Text style={styles.text}>Precio estimado del viaje:</Text>
        <Text style={[styles.text, styles.priceText]}>{estimatedPrice}</Text>
      </View>
      <View style={styles.distancePriceContainer}>
        <Text style={styles.text}>Distancia:</Text>
        <Text style={[styles.text, styles.priceText]}>
          {distanceKm.toFixed(1)}
          {' '}
          km
        </Text>
      </View>
      {/* <Text style={styles.paymentText}>
        {`${trip.driver} acepta Transferencia o Efectivo`}
      </Text> */}
      <Text style={styles.paymentText}>Andrea acepta Transferencia o Efectivo</Text>

    </View>
  );
}

export default TripPrice;
