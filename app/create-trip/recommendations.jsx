import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
        travelers_type: "Solo", // Change as per user selection
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
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Destinations</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.Destination}</Text>
              <Text>Category: {item.Category}</Text>
              <Text>Budget: ${item.Budget}</Text>
              <Text>Duration: {item.Duration}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No recommendations found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
});
