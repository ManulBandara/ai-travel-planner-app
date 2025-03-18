import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getRecommendations } from "../../configs/api";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated!");
        return;
      }

      const userRef = doc(db, "preferences", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.log("No user preferences found!");
        return;
      }

      const userData = userSnap.data();
      const requestData = {
        activities: userData.preferences || [],
        travelers_type: "Solo",
        travel_date: "Best time to visit",
        budget_category: userData.budget || "Moderate",
      };

      const result = await getRecommendations(requestData);
      setRecommendations(result);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
      <Text style={styles.header}>Recommended Destinations</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.Destination}</Text>
              <Text style={styles.detail}>Category: {item.Category}</Text>
              <Text style={styles.detail}>Budget: ${item.Budget}</Text>
              <Text style={styles.detail}>Duration: {item.Duration}</Text>
              <Text style={styles.accommodations}>
                Nearby Stay: {item.Accommodations}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  Linking.openURL(
                    `https://www.booking.com/searchresults.html?ss=${item.Destination}`
                  )
                }
              >
                <Text style={styles.buttonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>No recommendations found.</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  detail: { fontSize: 16, color: "#555", marginVertical: 2 },
  accommodations: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#007BFF",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  noData: { fontSize: 18, color: "#fff", textAlign: "center", marginTop: 20 },
});
