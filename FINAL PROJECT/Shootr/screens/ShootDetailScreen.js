import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { ShootContext } from "../store/context/ShootContext";

import Colors from "../constants/colors";

export default function ShootDetailsScreen({ route }) {
  const { shootId } = route.params;
  const { shoots } = useContext(ShootContext);

  const shoot = shoots.find((s) => s.id === shootId);

  if (!shoot) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Shoot not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{shoot.clientName}</Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Shoot Details</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(shoot.date).toDateString()}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{shoot.location}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${shoot.price}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{shoot.status}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Gear Used</Text>

        <Text style={styles.label}>Camera:</Text>
        <Text style={styles.value}>{shoot.gear.camera || "None"}</Text>

        <Text style={styles.label}>Lenses:</Text>
        <Text style={styles.value}>
          {shoot.gear.lenses?.length ? shoot.gear.lenses.join(", ") : "None"}
        </Text>

        <Text style={styles.label}>Accessories:</Text>
        <Text style={styles.value}>
          {shoot.gear.accessories?.length
            ? shoot.gear.accessories.join(", ")
            : "None"}
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>Notes</Text>
        <Text style={styles.value}>{shoot.notes || "No notes provided"}</Text>
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
    fontSize: 28,
    fontFamily: "helvetica_bold",
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },

  sectionCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionHeader: {
    fontSize: 20,
    fontFamily: "helvetica_bold",
    color: Colors.purple300,
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    fontFamily: "helvetica_bold",
    color: Colors.textPrimary,
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textMuted,
    marginBottom: 5,
  },

  error: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    fontFamily: "helvetica_bold",
    color: Colors.danger,
  },
});
