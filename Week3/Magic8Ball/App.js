import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
    <StatusBar style='auto'/>
    <SafeAreaView style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Magic 8 Ball</Text>      
      </View>
      
      <View>
        <Text>User Text goes here</Text>
      </View>

      <View style={styles.shakeButtonContainer}>
        <Pressable
        android_ripple={{color: "white"}}
        onPress={() => {console.log("Pressed")}}
        style={({pressed}) => pressed && styles.pressedButton}
        >
          <View style={styles.shakeButton}>
            <Text style={styles.shakeButtonText}>Shake Magic 8 Ball</Text>
          </View>
        </Pressable>
      </View>
      // Do I need to display the 8ball response 
      // on the main page or just the modal page?
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#b274caff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: "black",
    width: "90%",
    justifyContent: "center",
    margin: "20",
    borderWidth: 3,
    borderRadius: 25
  },
  title: {
    fontSize: 40,
    color: "purple",
    textAlign: "center"
  },
  shakeButtonContainer: {
    flex: 1,
    justifyContent: "center"
  },
  shakeButton: {
    backgroundColor: "black",
    borderRadius: 40,
    padding: 5
  },
  shakeButtonText: {
    color: "purple",
  },
  pressedButton: {
    opacity: 0.5
  }
});
