// Componente de selector de hora
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
  textInputEmpty: {
    marginTop: 10,
    marginBottom: 5,
    color: '#D1D6DB',
  },
});

function TimePicker({
  value, onChange, open, setOpen,
}) {
  const handleOnChange = (event, selectedTime) => {
    setOpen(false);
    onChange(selectedTime);
  };

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="time" size={20} color="#D1D6DB" style={{ marginRight: 10 }} />
        <Text style={value ? styles.textInput : styles.textInputEmpty}>
          {value
            ? dayjs(value).format('HH:mm')
            : 'Seleccionar hora'}
        </Text>
      </Pressable>
      {open && (
        <DateTimePicker
          locale="es-ar"
          value={value || new Date()}
          is24Hour
          mode="time"
          minimumDate={new Date()}
          onCancel={() => setOpen(false)}
          onChange={handleOnChange}
        />
      )}
    </>
  );
}

export default TimePicker;
