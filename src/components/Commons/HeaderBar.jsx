import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#35424a',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Componente HeaderBar reutilizable para mantener un diseño consistente en la app
 *
 * @param {string} title - Título a mostrar en el centro del header
 * @param {function} onGoBack - Función a ejecutar cuando se presiona el botón de retroceso
 * @param {string} rightIcon - Nombre del icono a mostrar en la derecha (opcional)
 * @param {function} onRightPress - Función a ejecutar cuando se presiona el botón derecho(opcional)
 * @param {Object} containerStyle - Estilo adicional para el contenedor (opcional)
 */
function HeaderBar({
  title,
  onGoBack,
  rightIcon,
  onRightPress,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onGoBack} disabled={!onGoBack}>
        {onGoBack ? (
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        ) : (
          <View style={styles.iconContainer} />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} disabled={!onRightPress}>
          <Ionicons name={rightIcon} size={24} color="#F85F6A" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconContainer} />
      )}
    </View>
  );
}

export default HeaderBar;
