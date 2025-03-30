/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';
import { userActions } from '../../redux/actions';
import Container from '../Commons/Container';
import HeaderBar from '../Commons/HeaderBar';

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 5,
  },
});

function ViewProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data);
  const authUser = useSelector((state) => state.authentication.user);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userActions.getUser(authUser.id));
    }, [dispatch, authUser.id]),
  );

  const handleChangeView = () => {
    navigation.navigate('EditProfile', { user });
  };

  return (
    <Container>
      <HeaderBar title="Perfil" onGoBack={() => navigation.goBack()} />

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Nombre y Apellido</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>{user?.name}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>DNI</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>{user?.dni}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha de nacimiento</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>{dayjs(user?.birthdate).format('DD/MM/YYYY')}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Dirección</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>{user?.address}</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Email</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>{user?.email}</Text>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  width: '80%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={handleChangeView}
              >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                  Editar perfil
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
}

export default ViewProfile;
