/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { userActions } from '../../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
  textInput: {
    marginVertical: 10,
  },
});

function ViewProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data);
  const authUser = useSelector((state) => state.authentication.user);

  React.useEffect(() => {
    dispatch(userActions.getUser(authUser.id));
  }, [authUser.id, dispatch]);

  const handleChangeView = () => {
    navigation.navigate('EditProfile', { user });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F85F6A" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Perfil</Text>
        <View style={{ flex: 1, marginTop: 16 }}>
          <ScrollView>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Apellido y Nombre</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>
                {user?.name}
                {' '}

              </Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>DNI</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>
                {user?.dni}
              </Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fecha de nacimiento</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>
                {dayjs(user?.birthdate).format('DD/MM/YYYY')}
              </Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Dirección</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>
                {user?.address}
              </Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Email</Text>
              <View style={{ marginVertical: 2 }} />
              <Text style={styles.textInput}>
                {user?.email}
              </Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#EBEBEB' }} />
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
    </View>
  );
}

export default ViewProfile;
