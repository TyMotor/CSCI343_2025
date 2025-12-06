import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext, useMemo } from "react";
import { ShootContext } from "../store/context/ShootContext";

import Colors from "../constants/colors";

function parseYMDToDate(ymd) {
  const [year, month, day] = ymd.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default function DashboardScreen() {
  const { shoots, totalRevenue } = useContext(ShootContext);

  const upcomingPreview = useMemo(() => {
    return shoots
      .filter((s) => s.status === "upcoming")
      .sort((a, b) => parseYMDToDate(a.date) - parseYMDToDate(b.date))
      .slice(0, 3);
  }, [shoots]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <Text style={styles.sectionTitle}>Next Shoots</Text>
      {upcomingPreview.length === 0 ? (
        <Text style={styles.empty}>No upcoming shoots</Text>
      ) : (
        upcomingPreview.map((shoot) => (
          <View key={shoot.id} style={styles.shootCard}>
            <Text style={styles.client}>{shoot.clientName}</Text>
            <Text style={styles.date}>
              {parseYMDToDate(shoot.date).toDateString()}
            </Text>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Completed Revenue</Text>
      <Text style={styles.revenue}>${totalRevenue}</Text>
    </View>
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
    textAlign: "center",
    marginBottom: 20,
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "helvetica_bold",
    marginTop: 20,
    marginBottom: 10,
    color: Colors.textSecondary,
  },

  empty: {
    fontSize: 16,
    fontFamily: "helvetica",
    color: Colors.textMuted,
    marginBottom: 10,
  },
  shootCard: {
    padding: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  client: {
    fontSize: 18,
    fontFamily: "helvetica_bold",
    color: Colors.textPrimary,
  },
  date: {
    fontSize: 15,
    fontFamily: "helvetica",
    color: Colors.textMuted,
  },
  revenue: {
    fontSize: 50,
    fontFamily: "helvetica_bold",
    color: Colors.success,
    marginTop: 2,
  },
});
