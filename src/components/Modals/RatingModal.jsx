import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../common/StarRating';
import { ratingActions, tripRequestActions } from '../../redux/actions';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    marginVertical: 10,
    width: '100%',
  },
  ratingContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#F85F6A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});

function RatingModal({
  visible, tripId, driverName, onClose, tripRequestId,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { loading, submitted } = useSelector((state) => state.rating);

  // Cerrar el modal y limpiar los estados cuando se envía correctamente
  React.useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        dispatch(tripRequestActions.getTripRequestById(tripRequestId));
        dispatch(ratingActions.clearRatingStatus());
        onClose();
      }, 1000);
    }
  }, [submitted, dispatch, onClose, tripRequestId]);

  const handleSubmit = () => {
    // Validar que la calificación sea válida
    if (rating < 1) {
      setError('Por favor, selecciona una calificación');
      return;
    }

    // Enviar la calificación al servidor
    dispatch(ratingActions.rateDriver(tripId, { rating, comment }));
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Calificar a
            {' '}
            {driverName}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>¿Cómo calificarías tu experiencia?</Text>
            <StarRating
              rating={rating}
              size={40}
              interactive
              onRatingChange={setRating}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text>Comentario (opcional):</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe un comentario sobre tu experiencia"
              multiline
              value={comment}
              onChangeText={setComment}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator size="large" color="#F85F6A" />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default RatingModal;
