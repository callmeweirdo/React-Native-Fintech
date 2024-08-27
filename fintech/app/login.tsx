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
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSignIn } from '@clerk/clerk-expo';

const Login = () => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 100;
  const theme = useTheme();

  const router = useRouter();
  const { signIn } = useSignIn();

  enum SignInType {
    Phone,
    Email,
    Google,
    Apple
  }

  const signInAction = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;

      router.push({
        pathname: '/verify/[phone]',
        params: { phone: fullPhoneNumber, signin: 'true' }
      })
      // try {
      //   const { supportedFirstFactors } = await signIn!.create({
      //     identifier: fullPhoneNumber
      //   });

      //   const { firstPhoneFactor }: any = supportedFirstFactors.find((factor: any) => factor.strategy === 'phone_code'
      //   )

      //   const { phoneNumberId } = firstPhoneFactor;

      //   await signIn!.prepareFirstFactor({
      //     strategy: 'phone_code',
      //     phoneNumberId,
      //   })

      //   router.push({pathname: '/verify/[phone]', params: {phone: fullPhoneNumber, signin: 'true'}})

      // } catch (error) {
          
      // }
    }

  };

  const handleNumber = (text: string) => {
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
          onPress={() => signInAction(SignInType.Phone)}
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

        <View style={styles.buttonView} >
          <Button
            onPress={() => signInAction(SignInType.Email)}
            style={{ color: 'black' }} >
            <Ionicons name='mail' size={24} color={'grey'} />
            <Text>Continue with email</Text>
          </Button>
        </View>

        <View style={styles.buttonView} >
          <Button
            onPress={() => signInAction(SignInType.Google)}
            style={{ color: 'black' }} >
            <Ionicons name='logo-google' size={24} color={'grey'} />
            <Text>Continue with Google</Text>
          </Button>
        </View>

        <View style={styles.buttonView} >
          <Button
            onPress={() => signInAction(SignInType.Apple)}
            style={{ color: 'black' }} >
            <Ionicons name='logo-apple' size={24} color={'grey'} />
            <Text>Continue with Apple</Text>
          </Button>
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
  buttonView: {
    marginVertical: 7
  }
});

export default Login;