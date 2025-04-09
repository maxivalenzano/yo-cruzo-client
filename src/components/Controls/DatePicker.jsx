/* eslint-disable react-native/no-inline-styles */
// Componente de selector de fecha
import React from 'react';
import {
  StyleSheet, Text, Pressable, View, TouchableOpacity,
} from 'react-native';
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
});

function DatePicker({
  value, onChange, open, setOpen,
}) {
  const handleOnChange = (event, selectedDate) => {
    setOpen(false);
    onChange(selectedDate);
  };

  const handleClearDate = () => {
    onChange(null);
  };

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="calendar" size={20} color="#D1D6DB" style={{ marginRight: 10 }} />
        <View style={styles.dateContainer}>
          <Text style={value ? styles.textInput : styles.textInputEmpty}>
            {value
              ? dayjs(value).format('DD/MM/YYYY')
              : 'Seleccionar fecha'}
          </Text>
          {value && (
            <TouchableOpacity
              onPress={handleClearDate}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#bbb" />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
      {open && (
        <DateTimePicker
          locale="es-ar"
          value={value || new Date()}
          minimumDate={new Date()}
          mode="date"
          onCancel={() => setOpen(false)}
          onChange={handleOnChange}
        />
      )}
    </>
  );
}

export default DatePicker;
