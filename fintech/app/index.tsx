import { View, Text } from 'tamagui';
import { StyleSheet } from 'react-native';
import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';

const index = () => {
    const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  return (
    <View style={styles.container} >
          {
        assets && <Video
          source={{ uri: assets[0].uri }}
          style={styles.video}
          isMuted
          isLooping
          shouldPlay
        />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})

export default index;