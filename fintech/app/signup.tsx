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

const Signup = () => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 100;
  const theme = useTheme();

  const handleNumber = (text) => {
    setPhoneNumber(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.container}>
        <H2 style={styles.H2}>Let's Get Started!</H2>
        <Text style={{ marginBottom: 20 }}>
          Enter your phone number, we will send you a confirmation code there.
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
            placeholderTextColor={theme.yellow10?.get()}
            style={[styles.input, { flex: 1, width: '85%' }]}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handleNumber}
          />
        </View>
        <Link href={'/login'} asChild replace>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Text color={theme.blue10?.get()}>Already have an Account?</Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <Button
          style={[
            styles.button,
            { backgroundColor: phoneNumber !== '' ? theme.yellow10?.get() : 'grey' },
          ]}
        >
          Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'column',
    padding: 20,
  },
  H2: {
    fontWeight: '500',
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

export default Signup;
