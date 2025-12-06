import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ShootDetailsScreen from "./screens/ShootDetailScreen";
import GearScreen from "./screens/GearScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CalendarScreen from "./screens/CalendarScreen";
import AddShootScreen from "./screens/AddShootScreen";
import { Ionicons, MaterialIcons, Entypo, Feather } from "@expo/vector-icons";

import { GearProvider } from "./store/context/PhotoGearContext";
import { ShootProvider } from "./store/context/ShootContext";

import Colors from "./constants/colors";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.primaryBackground,
    card: Colors.cardBackground,
    text: Colors.textPrimary,
    border: Colors.border,
  },
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryBackground,
        },
        headerTintColor: Colors.textPrimary,
        headerTitle: "", // Hide the default title
        headerRight: () => (
          <Text
            style={{
              color: Colors.danger,
              fontFamily: "killarney",
              fontSize: 40,
              marginRight: 16,
            }}
          >
            Shootr
          </Text>
        ),
      }}
    >
      <Drawer.Screen name="Shoots" component={TabsNavigator} />
      <Drawer.Screen name="Gear" component={GearScreen} />
    </Drawer.Navigator>
  );
}


function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.iconActive,
        tabBarInactiveTintColor: Colors.iconInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "helvetica_bold",
        },
        tabBarStyle: {
          backgroundColor: Colors.secondaryBackground,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 4,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ShootCalendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="AddShoot"
        component={AddShootScreen}
        options={{
          tabBarLabel: "Add Shoot",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-a-photo" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [loaded] = Font.useFonts({
    frutiger: require("./assets/fonts/Frutiger.ttf"),
    frutiger_bold: require("./assets/fonts/Frutiger_bold.ttf"),
    helvetica: require("./assets/fonts/Helvetica.ttf"),
    helvetica_oblique: require("./assets/fonts/Helvetica-Oblique.ttf"),
    helvetica_bold: require("./assets/fonts/Helvetica-Bold.ttf"),
    helvetica_boldOblique: require("./assets/fonts/Helvetica-BoldOblique.ttf"),
    helvetica_light: require("./assets/fonts/helvetica-light.ttf"),
    killarney: require("./assets/fonts/Killarney.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#F2F2F2"/>
        <GearProvider>
          <ShootProvider>
            <NavigationContainer theme={AppTheme}>
              <Stack.Navigator initialRouteName="DrawerScreen">
                <Stack.Screen
                  name="DrawerScreen"
                  component={DrawerNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ShootDetail"
                  component={ShootDetailsScreen}
                  options={{
                    headerStyle: { backgroundColor: Colors.cardBackground },
                    headerTintColor: Colors.textPrimary,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ShootProvider>
        </GearProvider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
