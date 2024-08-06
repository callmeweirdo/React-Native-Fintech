import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { H2, useTheme, View, Button } from 'tamagui';
import { Text } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 100;
  const theme = useTheme();

  const handleNumber = (text: any) => {
    setPhoneNumber(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.container}>
        <H2 style={styles.H2}>Welcome Back</H2>
        <Text style={{ marginBottom: 20 }}>
          Enter the phone number associated with your Account
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Country Code"
            value={countryCode}
            placeholderTextColor={theme.yellow10?.get()}
            style={[styles.input, { width: '25%' }]}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={'black'}
            style={[styles.input, { flex: 1, width: '85%' }]}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handleNumber}
          />
        </View>
        

        {/* <View style={{ flex: 1 }} /> */}


        <Button
          style={[
            styles.button,
            { backgroundColor: phoneNumber !== '' ? theme.yellow10?.get() : 'grey' },
          ]}
        >
          Continue
        </Button>
        <View style={{ flex: 1, margin: 15, flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 20 }} >
          <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
          <Text style={{ color: 'black', fontSize: 20 }} >Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
        </View>

      </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    flexDirection: 'column',
    padding: 20,
  },
  H2: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  input: {
    padding: 15,
    borderRadius: 16,
    fontSize: 20,
    backgroundColor: 'grey',
  },
  button: {
    marginTop: 20,
    fontWeight: 'bold',
    borderRadius: 30,
  },
});

export default Login;
