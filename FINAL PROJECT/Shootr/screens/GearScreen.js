import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { GearContext } from "../store/context/PhotoGearContext";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

import Colors from "../constants/colors";

export default function GearScreen() {
  const {
    cameras,
    lenses,
    accessories,
    addCamera,
    addLens,
    addAccessory,
    deleteCamera,
    deleteLens,
    deleteAccessory,
  } = useContext(GearContext);

  const [input, setInput] = useState("");
  const [category, setCategory] = useState("camera");

  function addItem() {
    if (!input.trim()) return;

    if (category === "camera") addCamera(input);
    if (category === "lens") addLens(input);
    if (category === "accessory") addAccessory(input);

    setInput("");
  }

  const renderList = (title, items, deleteFn) => (
    <View style={styles.listContainer}>
      <Text style={styles.subHeader}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listItemText}>{item}</Text>
          <View style={styles.deleteButtonContainer}>
            <Pressable onPress={() => deleteFn(item)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.header}>My Gear</Text>

      {renderList("Cameras", cameras, deleteCamera)}
      {renderList("Lenses", lenses, deleteLens)}
      {renderList("Accessories", accessories, deleteAccessory)}

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
          dropdownIconColor={Colors.textPrimary}
        >
          <Picker.Item
            label="Camera"
            value="camera"
            style={styles.pickerText}
          />
          <Picker.Item label="Lens" value="lens" style={styles.pickerText} />
          <Picker.Item
            label="Accessory"
            value="accessory"
            style={styles.pickerText}
          />
        </Picker>

        <TextInput
          placeholder="Enter gear name..."
          placeholderTextColor={Colors.textMuted}
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={addItem}
        >
          <Text style={styles.addButtonText}>Add Gear</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    fontSize: 26,
    fontFamily: "helvetica_bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.textPrimary,
  },

  subHeader: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: "helvetica_bold",
    color: Colors.textSecondary,
  },

  inputContainer: {
    marginTop: 30,
    marginBottom: 40,
  },

  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    color: Colors.textPrimary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: "helvetica",
  },

  picker: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: 10,
    color: Colors.textPrimary,
  },

  pickerText: {
    fontFamily: "helvetica",
    color: Colors.textPrimary,
    fontSize: 16,
  },

  listContainer: {
    marginBottom: 15,
    marginTop: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },

  listItemText: {
    flex: 1,
    marginRight: 20,
    fontFamily: "helvetica",
    fontSize: 16,
    color: Colors.textSecondary,
  },

  delete: {
    fontFamily: "helvetica_bold",
    color: Colors.danger,
    fontSize: 16,
  },
  addButton: {
  backgroundColor: Colors.buttonPrimary,
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 10,
},

addButtonPressed: {
  backgroundColor: Colors.buttonPrimaryPressed,
},

addButtonText: {
  color: Colors.textPrimary,
  fontSize: 16,
  fontFamily: "helvetica_bold",
},

});
