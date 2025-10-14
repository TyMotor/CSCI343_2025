import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from './screens/HomeScreen';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Colors from "./constants/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  //Fonts, SplashScreen, Loading
  const [loaded] = Font.useFonts({
    Mountain: require("./assets/fonts/Mountain.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  let screen = (
    <HomeScreen />
  )



  return (
    <>
    <StatusBar style='light' />
    <SafeAreaProvider style={styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent300
  },
});
