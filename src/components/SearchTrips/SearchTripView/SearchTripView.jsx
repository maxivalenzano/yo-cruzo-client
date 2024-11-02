import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Modal, TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../Commons/Container';
import TripView from './TripView';
import TripPrice from './TripPrice';
import Separator from '../../Controls/Separator';
import { calculateDistance } from '../../../helpers/distanceHelpers';
import TripDriverProfile from './TripDriverProfile';
import TripDriverRating from './TripDriverRating';
import { tripActions } from '../../../redux/actions';

function formatDate(date) {
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F85F6A',
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  // Nuevos estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  confirmButton: {
    backgroundColor: '#F85F6A',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
});

function SearchTripView({
  navigation,
  route: {
    params: { item },
  },
}) {
  const dispatch = useDispatch();
  const [elementMaps, setElementMaps] = useState(null);
  const { loading, created } = useSelector((state) => state.trip);

  // const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (created) {
      setModalVisible(false);
      navigation.replace('SuccessRequest');
    }
  }, [created, navigation]);

  useEffect(() => {
    const getDistance = async () => {
      const data = await calculateDistance(item.origin, item.destination);
      setElementMaps(data);
    };

    getDistance();
  }, [item.destination, item.origin]);

  const handleConfirmTrip = () => {
    // setTimeout(() => {
    //   setLoading(false);
    // Navegar a la pantalla de éxito
    // }, 2000);
    dispatch(tripActions.createTripRequest({ ...item, message }));
  };

  const handleCancelTrip = () => {
    setModalVisible(false);
    setMessage('');
  };

  return (
    <Container>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="run-circle" size={24} color="black" />
            <Text style={styles.dateText}>{formatDate(new Date(item.tripDate))}</Text>
          </View>
        </View>
        <View>
          <Separator />
          <TripView trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripPrice trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripDriverProfile trip={item} elementMaps={elementMaps} />
          <Separator />
          <TripDriverRating trip={item} elementMaps={elementMaps} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Confirmando...' : 'Sumarse al viaje'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={handleCancelTrip}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar viaje</Text>
            <Text>¿Estás seguro que deseas sumarte a este viaje?</Text>

            <TextInput
              style={styles.messageInput}
              multiline
              placeholder="Escribe un mensaje para el conductor (opcional)"
              value={message}
              onChangeText={setMessage}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelTrip}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmTrip}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Enviando...' : 'Enviar solicitud'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

export default SearchTripView;
