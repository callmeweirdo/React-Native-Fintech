import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { H2 } from 'tamagui'

const signup = () => {
  return (
    <View style={styles.container} >
      <H2 style={styles.H2} >Let's Get Started!</H2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  H2: {
    fontWeight: '500',
    textAlign: 'center'
  }
})

export default signup