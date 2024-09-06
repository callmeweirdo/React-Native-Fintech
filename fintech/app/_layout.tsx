import { useFonts } from 'expo-font';
import { Link, Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createTamagui, TamaguiProvider, Text, Theme } from 'tamagui';
import { config } from '@tamagui/config/v3';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export * as SecureStore from 'expo-secure-store';

export const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },

    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    }
  }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Cache teh clerk JWT

  
  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('Log..', isSignedIn);
  }, [isSignedIn])

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

  

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
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
                <Link href={'help'} asChild>
                  <TouchableOpacity style={{ marginRight: 20 }} >
                    <Ionicons name="help-circle-outline" size={28} color={'grey'} />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />

          <Stack.Screen name='help' options={{ 
            title: 'Help',
            presentation: 'formSheet'
          }} />
          
          <Stack.Screen
            name="verify/[phone]"
            options={{
              title: 'Verify',
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

        </Stack>
      </Theme>
    </TamaguiProvider>
  );
};

export default function RootLayout() {
  return <>
    <ClerkProvider  publishableKey={publishableKey} tokenCache={tokenCache} >
      <ClerkLoaded>
        <GestureHandlerRootView>
          <StatusBar style='light' />
          <InitialLayout />
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  </>
}