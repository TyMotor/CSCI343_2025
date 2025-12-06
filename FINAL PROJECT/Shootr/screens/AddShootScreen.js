import {
  Button,
  StyleSheet,
  Pressable,
  Switch,
  Text,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ShootContext } from "../store/context/ShootContext";
import { GearContext } from "../store/context/PhotoGearContext";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Colors from "../constants/colors";

export default function AddShootScreen() {
  const navigation = useNavigation();
  const { addShoot } = useContext(ShootContext);
  const { cameras, lenses, accessories } = useContext(GearContext);

  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [statusSwitch, setStatusSwitch] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedLenses, setSelectedLenses] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const [notes, setNotes] = useState("");

  const [cameraModal, setCameraModal] = useState(false);
  const [lensModal, setLensModal] = useState(false);
  const [accessoryModal, setAccessoryModal] = useState(false);

  function toggleArraySelection(array, setArray, item) {
    if (array.includes(item)) {
      setArray(array.filter((x) => x !== item));
    } else {
      setArray([...array, item]);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  }

  function handleAddShoot() {
    if (!clientName || !location || !price) {
      alert("Please fill all required fields");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    addShoot({
      clientName,
      date: formattedDate,
      location,
      price: Number(price),
      status: statusSwitch ? "completed" : "upcoming",
      notes,
      gear: {
        camera: selectedCamera,
        lenses: selectedLenses,
        accessories: selectedAccessories,
      },
    });

    setClientName("");
    setLocation("");
    setPrice("");
    setSelectedCamera(null);
    setSelectedLenses([]);
    setSelectedAccessories([]);
    setNotes("");
    setStatusSwitch(false);
    setDate(new Date());

    navigation.navigate("ShootCalendar");
  }

  function renderMultiSelectModal(
    title,
    items,
    selectedItems,
    setSelectedItems,
    visible,
    setVisible
  ) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalCenter}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{title}</Text>

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
            >
              {items.map((item, index) => (
                <BouncyCheckbox
                  key={index}
                  text={item}
                  isChecked={selectedItems.includes(item)}
                  onPress={() =>
                    toggleArraySelection(selectedItems, setSelectedItems, item)
                  }
                  textStyle={{
                    textDecorationLine: "none",
                    fontSize: 16,
                    color: Colors.textPrimary,
                    fontFamily: "helvetica",
                  }}
                  style={styles.checkboxItem}
                  fillColor={Colors.purple500}
                  unFillColor={Colors.inputBackground}
                />
              ))}
            </ScrollView>

            <View style={styles.modalButtonContainer}>
              <Button title="Done" onPress={() => setVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.primaryBackground }}>
      <View style={styles.container}>
        <Text style={styles.header}>Add a New Shoot</Text>

        <TextInput
          style={styles.input}
          placeholder="Client Name"
          placeholderTextColor={Colors.inputPlaceholder}
          value={clientName}
          onChangeText={setClientName}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor={Colors.inputPlaceholder}
          value={location}
          onChangeText={setLocation}
        />

        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text style={styles.selector}>
            Select Date: {date.toDateString()}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker mode="date" value={date} onChange={handleDateChange} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Price"
          placeholderTextColor={Colors.inputPlaceholder}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Pressable onPress={() => setCameraModal(true)}>
          <Text style={styles.selector}>
            Camera: {selectedCamera || "Select camera"}
          </Text>
        </Pressable>

        {renderMultiSelectModal(
          "Select Camera",
          cameras,
          selectedCamera ? [selectedCamera] : [],
          (arr) => setSelectedCamera(arr[0]),
          cameraModal,
          setCameraModal
        )}

        <Pressable onPress={() => setLensModal(true)}>
          <Text style={styles.selector}>
            Lenses:{" "}
            {selectedLenses.length
              ? selectedLenses.join(", ")
              : "Select lenses"}
          </Text>
        </Pressable>

        {renderMultiSelectModal(
          "Select Lenses",
          lenses,
          selectedLenses,
          setSelectedLenses,
          lensModal,
          setLensModal
        )}

        <Pressable onPress={() => setAccessoryModal(true)}>
          <Text style={styles.selector}>
            Accessories:{" "}
            {selectedAccessories.length
              ? selectedAccessories.join(", ")
              : "Select accessories"}
          </Text>
        </Pressable>

        {renderMultiSelectModal(
          "Select Accessories",
          accessories,
          selectedAccessories,
          setSelectedAccessories,
          accessoryModal,
          setAccessoryModal
        )}

        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Notes (optional)"
          placeholderTextColor={Colors.inputPlaceholder}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            Status: {statusSwitch ? "Completed" : "Upcoming"}
          </Text>
          <Switch
            value={statusSwitch}
            onValueChange={setStatusSwitch}
            thumbColor={Colors.purple500}
            trackColor={{
              false: Colors.textMuted,
              true: Colors.purple700,
            }}
          />
        </View>

        <Pressable style={styles.addButton} onPress={handleAddShoot}>
          <Text style={styles.addButtonText}>Add Shoot</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.primaryBackground,
  },

  header: {
    fontSize: 26,
    fontFamily: "helvetica_bold",
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 20,
  },

  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    color: Colors.textPrimary,
    fontFamily: "helvetica",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  dateButton: {
    backgroundColor: Colors.cardBackground,
    color: Colors.textPrimary,
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "helvetica",
  },

  selector: {
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: Colors.textSecondary,
    fontFamily: "helvetica",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  switchLabel: {
    color: Colors.textPrimary,
    fontFamily: "helvetica",
    fontSize: 16,
  },

  addButton: {
    backgroundColor: Colors.buttonPrimary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  addButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: "helvetica_bold",
  },

  modalCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 25,
  },

  modalBox: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 12,
    padding: 25,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: "helvetica_bold",
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 15,
  },

  modalScroll: {
    maxHeight: "65%",
  },

  modalScrollContent: {
    paddingBottom: 20,
  },

  checkboxItem: {
    marginVertical: 8,
  },

  modalButtonContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
});
