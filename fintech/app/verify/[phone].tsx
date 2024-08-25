import { Platform, StyleSheet } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { SignIn, useSignIn, useSignUp } from '@clerk/clerk-react';
import { H2, H3, View, Text, } from 'tamagui';
import { TouchableOpacity } from 'react-native-gesture-handler';

// ? code verification imports
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;

const Phone = () => {
  const { phone } = useLocalSearchParams<{ phone: string, signin: string }>();
  
  const [code, setCode] = useState('');

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: code,
      setValue: setCode
    });
  
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
  
  const verifySignIn = async () => { }
  

  

  return (
    <View style={styles.container} >
      <H2 style={{ fontWeight: 'bold' }} >6-digit code</H2>
      <Text marginTop={10} >
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={Platform
                .select({ android: 'sms-otp', default: 'one-time-code' })}
              testID="my-code-input"
              renderCell={({index, symbol, isFocused}) => (
                <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
              )}
            />  

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
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
})

export default Phone;