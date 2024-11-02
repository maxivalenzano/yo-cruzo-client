import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Container from '../../Commons/Container';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  successIcon: {
    color: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#F85F6A',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timer: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});

function SuccessRequestScreen({ navigation }) {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // Iniciar el contador regresivo
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Navegar a Mis Viajes cuando el contador llegue a 0
          navigation.replace('SignIn');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Limpiar el timer cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [navigation]);

  const handleContinue = () => {
    navigation.replace('MyTrips');
  };

  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="check-circle"
            size={80}
            style={styles.successIcon}
          />
        </View>

        <Text style={styles.title}>¡Solicitud enviada!</Text>

        <Text style={styles.message}>
          Tu solicitud para unirte al viaje ha sido enviada correctamente.
          El conductor revisará tu solicitud y recibirás una notificación
          cuando sea aceptada.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            Continuar
          </Text>
        </TouchableOpacity>

        <Text style={styles.timer}>
          Redirigiendo en
          {' '}
          {timeLeft}
          {' '}
          segundos...
        </Text>
      </View>
    </Container>
  );
}

export default SuccessRequestScreen;
