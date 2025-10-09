import { Text, View, StyleSheet, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RadioGroup } from "react-native-radio-buttons-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Title from "../components/Title";
import Colors from "../constants/colors";
import NavButton from "../components/NavButton";
import { LinearGradient} from "expo-linear-gradient";

export default function HomeScreen(props) {
  // Set Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
    colors={[Colors.accent500, Colors.primary800]}
    start={styles.container}
    >
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Title>Billy's Bicycles</Title>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/*Service Time Options*/}
        <View style={styles.radioContainer}>
          <Text style={styles.radioHeader}>Service Times: </Text>
          <RadioGroup
            radioButtons={props.repairTimeRadioButtons}
            onPress={props.onSetRepairTimeId}
            selectedId={props.repairTimeId}
            layout="row"
            containerStyle={styles.radioGroup}
            labelStyle={styles.radioGroupLabel}
          />
        </View>

        {/*Service Type Options*/}
        <View style={styles.checkBoxContainer}>
          <Text style={styles.checkBoxHeader}>Service Types: </Text>
          <View style={styles.checkBoxSubContainer}>
            {props.services.map((item) => {
              return (
                <BouncyCheckbox
                  key={item.id}
                  text={item.name}
                  onPress={props.onSetServices.bind(this, item.id)}
                  textStyle={{
                    textDecorationLine: "none",
                    fontFamily: "Simple",
                    fontSize: 20,
                    color: Colors.primary500,
                  }}
                  innerIconStyle={{
                    borderRadius: 0,
                    borderColor: Colors.primary500,
                  }}
                  iconStyle={{ borderRadius: 0 }}
                  fillColor={Colors.primary500}
                  style={styles.checkBox}
                />
              );
            })}
          </View>
        </View>

        {/* Switch Buttons */}
        <View style={styles.rowContainer}>
            <View style={styles.sliderSubcontainer}>
                <Text style={styles.sliderLabel}>Newsletter:</Text>
                <Switch 
                onValueChange={props.onSetNewsletter}
                value={props.newsletter}
                thumbColor={
                    props.newsletter ? Colors.primary500 : Colors.primary800
                }
                trackColor={{ false: "#767577", true: "#81b0ff"}}
                />
            </View>
            <View style={styles.sliderSubcontainer}>
                <Text style={styles.sliderLabel}>Rental Member:</Text>
                <Switch 
                onValueChange={props.onSetRentalMembership}
                value={props.rentalMembership}
                thumbColor={
                    props.rentalMembership ? Colors.primary500 : Colors.primary800
                }
                trackColor={{ false: "#767577", true: "#81b0ff"}}
                />
            </View>   
        </View>
        <View style={styles.buttonContainer}>
            <NavButton onPress={props.onNext}>Submit Order</NavButton>
        </View>
      </ScrollView>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 30,
    borderColor: Colors.primary500,
  },
  scrollContainer: {
    flex: 1,
  },
  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioHeader: {
    fontSize: 30,
    color: Colors.primary500,
    fontFamily: "Simple",
    paddingBottom: 20
  },
  radioGroup: {
    paddingBottom: 40,
  },
  radioGroupLabel: {
    fontSize: 20,
    fontFamily: "Simple",
    color: Colors.primary500,
  },
  checkBoxContainer: {
    paddingHorizontal: 12
  },
  checkBoxHeader: {
    fontSize: 20,
    color: Colors.primary500,
    fontFamily: "Simple"
  },
  checkBoxSubContainer: {
    padding: 2
  },
  checkBox: {
    padding: 10
  },
  rowContainer: {
    flexDirection: "row",
    padding: 30,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "space-between"
  },
  sliderSubcontainer: {
    justifyContent: "space-between",
  },
  sliderLabel: {
    color: Colors.primary500,
    fontSize: 20,
    fontFamily: "Simple"
  },
  buttonContainer: {
    alignItems: "center"
  }
});
