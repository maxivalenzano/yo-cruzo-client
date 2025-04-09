import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(248, 95, 106, 0.05)',
    borderWidth: 0,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
    marginRight: 5,
  },
  value: {
    fontSize: 13,
    color: '#F85F6A',
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
});

function SortButton({ currentSortText, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.textContainer}>
        <Text style={styles.label}>Ordenar por:</Text>
        <Text style={styles.value}>{currentSortText}</Text>
      </View>
      <Ionicons name="chevron-down" size={16} color="#F85F6A" style={styles.icon} />
    </TouchableOpacity>
  );
}

export default SortButton;
