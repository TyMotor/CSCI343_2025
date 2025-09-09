import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from "react-native";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./assets/images/RaisingCanes.jpg")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text 
            style={styles.name}
            >
              Raising Canes
            </Text>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL("https://www.raisingcanes.com/home/");
            }}
          >
            www.raisingcanes.com/home/
          </Text>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL("tel:8436062999");
            }}
          >
            843-606-2999
          </Text>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL("https://maps.app.goo.gl/msUqAn9JmWTUiuRW9");
            }}
          >
            Open in Google Maps
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 5,
    justifyContent: "center",
    marginTop: 25,
    width: "100%",
  },
  image: {
    height: 275,
    width: "100%",
    borderColor: "white",
    borderWidth: 3,
  },
  textContainer: {
    backgroundColor: "red",
    flex: 8,
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontStyle: "italic",
    marginBottom: 20,
  },
});
