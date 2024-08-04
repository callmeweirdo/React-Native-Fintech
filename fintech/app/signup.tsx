import {  StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { H2, useTheme, View, Text, Button, } from 'tamagui'
import { Link } from 'expo-router';

const signup = () => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState();
  const theme = useTheme();


  const handleNumber = () => {

  }

  return (
    <View style={styles.container} >
      <H2 style={styles.H2} >Let's Get Started!</H2>
      <Text style={{ marginBottom: 20 }} >Enter your phone number, Wel will send you a confirmation code there</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Country Code'
          value={countryCode}
          placeholderTextColor={theme.yellow10?.get()}
          style={[styles.input, { width: '25%' }]}
          keyboardType='numeric'
        />
        <TextInput
          placeholder='Phone Number'
          placeholderTextColor={theme.yellow10?.get()}
          style={[styles.input, { flex: 1, width: '85%' }]}
          keyboardType='numeric'
          value={phoneNumber}
          onChange={handleNumber}
        />
      </View>
      <Link href={'/login'} asChild replace>
        <TouchableOpacity style={{ marginTop: 20 }} >
          <Text color={theme.blue10?.get()} >Already have an Account ?</Text>
        </TouchableOpacity>
      </Link>

      <View style={{ flex: 1 }} />

      <Link href='/signup' asChild>
          <Button style={{ marginTop: 20, fontWeight: '500' }} >Sign Up</Button>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'column',
    padding: 20
  },
  H2: {
    fontWeight: '500',
    textAlign: 'center',
    padding: 20,
    // marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%'
  },
  input: {
    padding: 15,
    borderRadius: 16,
    fontSize: 20,
    backgroundColor: 'grey'
  }
})

export default signup