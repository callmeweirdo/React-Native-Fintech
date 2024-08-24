import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Phone = () => {
    const { phone } = useLocalSearchParams<{phone: string, signin: string}>();

  return (
    <View>
      <Text>{phone}</Text>
    </View>
  )
}

export default Phone;