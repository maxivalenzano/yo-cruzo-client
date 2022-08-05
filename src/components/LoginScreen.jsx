import * as React from 'react';
import {
  Text, View, TextInput, Button, Alert,
  StyleSheet,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

function LoginScreen() {
  const {
    register, setValue, handleSubmit, control, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data) => {
    console.log('🚀 ~ file: LoginScreen.jsx ~ line 48 ~ onSubmit ~ data', data);
  };

  const onChange = (arg) => ({
    value: arg.nativeEvent.text,
  });

  console.log('🚀 ~ file: LoginScreen.jsx ~ line 47 ~ LoginScreen ~ errors', errors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <Controller
        control={control}
        render={({ field: { onChange: onChange2, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(val) => onChange2(val)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({ field: { onChange: onChange2, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(val) => onChange2(val)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Reset"
          onPress={() => {
            reset({
              firstName: 'Bill',
              lastName: 'Luo',
            });
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Button"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

export default LoginScreen;
