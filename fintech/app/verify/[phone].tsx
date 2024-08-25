import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { SignIn, useSignIn, useSignUp } from '@clerk/clerk-react';
import { H2, H3, View, Text, } from 'tamagui';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Phone = () => {
  const { phone } = useLocalSearchParams<{ phone: string, signin: string }>();
  
  const [code, setCode] = useState('');

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  useEffect(() => {
    if (code.length === 6) {
      // verify code
      if (signin === 'true') {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code])
  
  const verifyCode = async () => {}
  
  const verifySignIn = async () => {}

  return (
    <View style={styles.container} >
      <H2 style={{ fontWeight: 'bold' }} >6-digit code</H2>
      <Text marginTop={10} >
        Code sent to {phone} unless you already have an account
      </Text>
      <Link href={'/login'} replace asChild >
        <TouchableOpacity>
          <Text marginTop='$2' color="blue" >Already have an account ?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'column',
    padding: 20,
  }
})

export default Phone;