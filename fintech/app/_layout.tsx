import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createTamagui, TamaguiProvider, Text, Theme } from 'tamagui';
import { config } from '@tamagui/config/v3';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // you usually export this from a tamagui.config.ts file
  const tamaguiConfig = createTamagui(config);

  // TypeScript types across all Tamagui APIs
  type Conf = typeof tamaguiConfig;
  declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends Conf {}
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={'yellow'}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup"
            options={{
              title: '',
              headerBackTitle: '',
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#fff' },
              headerLeft: () => (
                <TouchableOpacity onPress={ router.back } >
                  <Ionicons name="arrow-back" size={28} color={'grey'} />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="login"
            options={{
              title: '',
              headerBackTitle: '',
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#fff' },
              headerLeft: () => (
                <TouchableOpacity onPress={ router.back } >
                  <Ionicons name="arrow-back" size={28} color={'grey'} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={ router.back } >
                  <Ionicons name="help-circle-outline" size={28} color={'grey'} />
                </TouchableOpacity>
              ),
            }}
          />

        </Stack>
      </Theme>
    </TamaguiProvider>
  );
};

export default function RootLayout() {
  return <> 
    <GestureHandlerRootView>
      <StatusBar style='light' />
      <InitialLayout />
    </GestureHandlerRootView>
  </> 
}
