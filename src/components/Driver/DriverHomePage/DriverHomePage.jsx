import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { tripActions, tripRequestActions } from '../../../redux/actions';
import Container from '../../Commons/Container';
import TripCard from '../../SearchTrips/SearchTripList/TripCard';
import PendingRequestsCard from '../../Trips/PendingRequests/PendingRequestsCard';

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createTripButton: {
    backgroundColor: '#F85F6A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  noTripsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F85F6A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  tripCardContainer: {
    marginBottom: 12, // Añade espacio entre las tarjetas
  },
});

function DriverHomePage({ navigation }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authentication.user);
  const trips = useSelector((state) => state.trip.trips) || [];
  const [refreshing, setRefreshing] = useState(false);

  const { driverTrips } = useSelector((state) => state.tripRequest);

  const loadData = React.useCallback(() => {
    dispatch(tripActions.getAll());
    dispatch(tripRequestActions.getAllTripRequestForDriver());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Filtrar solo los próximos viajes (fecha futura)
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.tripDate) > new Date())
    .sort((a, b) => new Date(a.tripDate) - new Date(b.tripDate));

  // Tomar solo los 3 más próximos
  const nextTrips = upcomingTrips.slice(0, 3);

  // Estadísticas básicas
  const totalTrips = trips.length;
  const completedTrips = trips.filter((trip) => new Date(trip.tripDate) < new Date()).length;

  return (
    <Container>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              ¡Hola,
              {authUser?.name?.split(' ')[0] || 'Conductor'}
              !
            </Text>
            <Text style={styles.subtitle}>¿Listo para publicar un viaje hoy?</Text>
          </View>

          <TouchableOpacity
            style={styles.createTripButton}
            onPress={() => navigation.navigate('CreatedTrips', { screen: 'CreateTrip' })}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Crear nuevo viaje</Text>
          </TouchableOpacity>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalTrips}</Text>
              <Text style={styles.statLabel}>Viajes totales</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedTrips}</Text>
              <Text style={styles.statLabel}>Viajes completados</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{driverTrips.length}</Text>
              <Text style={styles.statLabel}>Solicitudes</Text>
            </View>
          </View>

          {driverTrips.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>Solicitudes pendientes</Text>
              <PendingRequestsCard
                count={driverTrips.length}
                onPress={() => navigation.navigate('PendingTripRequest')}
              />
            </View>
          )}

          <Text style={styles.sectionTitle}>Próximos viajes</Text>
          {nextTrips.length > 0 ? (
            nextTrips.map((trip) => (
              <View key={trip.id} style={styles.tripCardContainer}>
                <Pressable onPress={() => navigation.navigate('ManageTrip', trip)}>
                  {({ pressed }) => <TripCard trip={trip} pressed={pressed} />}
                </Pressable>
              </View>
            ))
          ) : (
            <View style={styles.card}>
              <Text style={styles.noTripsText}>
                No tienes viajes próximos programados. ¡Crea uno nuevo para empezar a compartir
                gastos!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

export default DriverHomePage;
