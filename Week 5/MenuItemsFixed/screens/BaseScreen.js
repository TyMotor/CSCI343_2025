import { StyleSheet, Text, View, Image, Linking, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '../components/Title';
import Colors from '../constants/colors';

export default function baseScreen(props) {
  // Setting Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();
  return (<View
      style={[
      styles.rootContainer,
      {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
      },
      ]}
  >
  <View style={styles.titleContainer}>
      <Title>Dagwood's Deli</Title>
  </View>

  <View style={styles.imageContainer}>
    <Image style={styles.image} source={require("../assets/images/dagwoods1.jpg")} />
  </View>

  <View style={styles.infoContainer}>
    <Text
    style={styles.infoText}
    onPress={() => Linking.openURL("tel:8438284600")}
    >
      843-828-4600
    </Text>

    <Text
    style={styles.infoText}
    onPress={() => Linking.openURL("https://maps.app.goo.gl/wXcCiSWhrUzKsQ2F8")}>
        600 US-17 BUS{"\n"}Surfside Beach{"\n"}SC 29575
    </Text>
    
    <Text
    style={styles.infoText}
    onPress={() => Linking.openURL("https://dagwoodsdeli.com/")}>
      www.dagwoodsdeli.com
    </Text>
  </View>

  <View style={styles.buttonContainer}>
    <Button title="View Menu" onPress={props.onNext} color="#645600ff"/>
  </View>
  </View>);
}


const styles = StyleSheet.create({
 rootContainer: {
   flex: 1,
   alignItems: "center"
 },
 titleContainer: {
  flex: 1,
  justifyContent: "center"
 },
 imageContainer: {
  flex: 4
 },
 image: {
  resizeMode: "cover",
  height: "100%",
  width: 380
 },
 infoContainer: {
  flex: 3,
  justifyContent: "center"
 },
 infoText: {
  fontSize: 30,
  textAlign: "center",
  padding: 7,
  fontFamily: "kinder-surf",
  color: Colors.primary500
 },
 buttonContainer: {
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
  borderRadius: 40,
  width: 150,
 }
});
