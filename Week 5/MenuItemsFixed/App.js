import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import BaseScreen from './screens/BaseScreen';
import MenuItemsScreen from './screens/MenuItemsScreen';
import Colors from "./constants/colors"

export default function App() {
 const [fontsLoaded] = useFonts({
  "kinder-surf": require("./assets/fonts/Kinder Surf.ttf"), 
  "tops-again": require("./assets/fonts/TOPS AGAIN! - DEMO.ttf") 
 })

 const [currentScreen, setCurrentScreen] = useState("base")


 function menuItemScreenHandler() {
   setCurrentScreen("items");
 }


 function baseScreenHandler() {
   setCurrentScreen("base");
 }


 let screen = <BaseScreen onNext={menuItemScreenHandler}/>;


 if (currentScreen == "items") {
   screen = <MenuItemsScreen onNext={baseScreenHandler}/>;
 }

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
   backgroundColor: Colors.accent500,
   alignItems: 'center',
   justifyContent: 'center',
 },
});
