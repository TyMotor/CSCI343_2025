import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useMemo } from "react";
import { ShootContext } from "../store/context/ShootContext";

import Colors from "../constants/colors";

function parseYMDToDate(ymd) {
  const [year, month, day] = ymd.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default function CalendarScreen({ navigation }) {
  const { shoots, editShoot } = useContext(ShootContext);

  const upcomingShoots = useMemo(() => {
    return shoots
      .filter((s) => s.status === "upcoming")
      .sort((a, b) => parseYMDToDate(a.date) - parseYMDToDate(b.date));
  }, [shoots]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Shoots</Text>

      <FlatList
        data={upcomingShoots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const displayDate = new Date(item.date).toDateString();

          return (
            <View style={styles.card}>
              <Pressable
                style={{ flex: 1 }}
                onPress={() =>
                  navigation.navigate("ShootDetail", { shootId: item.id })
                }
              >
                <Text style={styles.clientName}>{item.clientName}</Text>
                <Text style={styles.date}>{displayDate}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </Pressable>

              <Pressable
                style={styles.completeButton}
                onPress={() => editShoot(item.id, { status: "completed" })}
              >
                <Text style={styles.completeText}>✔</Text>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No shoots scheduled.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryBackground,
  },
  header: {
    fontSize: 26,
    fontFamily: "helvetica_bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.textPrimary,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clientName: {
    fontSize: 18,
    fontFamily: "helvetica_bold",
    color: Colors.textPrimary,
  },
  date: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textSecondary,
    marginTop: 3,
  },
  location: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textMuted,
  },
  price: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textSecondary,
    marginTop: 3,
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textMuted,
  },

  completeButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  completeText: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
  },
});

