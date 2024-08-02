import { View, Text, XGroup, Button, useTheme } from 'tamagui';
import { StyleSheet } from 'react-native';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';

const index = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {
        assets && <Video
          source={{ uri: assets[0].uri }}
          style={styles.video}
          isMuted
          isLooping
          shouldPlay
          resizeMode={ResizeMode.COVER}
        />
      }
      <View style={{ marginTop: 80, padding: 20 }} >
        <Text style={styles.header} >Ready to Change the way you Money ?</Text>
      </View>
      <View style={{ flexDirection: 'row', padding: 20, gap: 10 }} >
        <Link href='/login' style={{ backgroundColor: 'grey' }} asChild>
          <Button  href='/login' style={styles.button } color={'#fff'} >Login</Button>
        </Link>
        <Link href='/signup' asChild>
          <Button style={styles.button} >Sign Up</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white'
  },
  button: {
    fontSize: 22,
    fontWeight: '500',
    borderRadius: 50,
    padding: 10,
    width: '50%'
  }
})

export default index;