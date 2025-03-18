import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { getRecommendations } from "../../configs/api";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const saveRecommendations = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "User not authenticated!");
      return;
    }

    setSaving(true);

    try {
      const userRef = doc(db, "preferences", user.uid);
      await setDoc(userRef, { recommendations }, { merge: true });
      Alert.alert("Success", "Recommendations saved successfully!");
    } catch (error) {
      console.error("Error saving recommendations:", error);
      Alert.alert("Error", "Failed to save recommendations.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌍 Recommended Destinations ✈️</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff5733" />
      ) : recommendations.length > 0 ? (
        <>
          <FlatList
            data={recommendations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInUp.duration(500)}
                exiting={FadeOut}
                style={styles.card}
              >
                <Text style={styles.title}>{item.Destination} 🌟</Text>
                <Text style={styles.detail}>Category: {item.Category}</Text>
                <Text style={styles.detail}>Budget: ${item.Budget}</Text>
                <Text style={styles.detail}>Duration: {item.Duration}</Text>
                <Text style={styles.accommodations}>
                  🏨 Nearby Stay: {item.Accommodations}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    Linking.openURL(
                      `https://www.booking.com/searchresults.html?ss=${item.Destination}`
                    )
                  }
                >
                  <Text style={styles.buttonText}>Book Now 🔗</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          />
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.disabledButton]}
            onPress={saveRecommendations}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? "Saving... 💾" : "Save All 💾"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noData}>No recommendations found. 😔</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff5733",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fef2f2",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#ff5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#d63384" },
  detail: { fontSize: 16, color: "#555", marginVertical: 2 },
  accommodations: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#007BFF",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff5733",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#ff5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  saveButton: {
    backgroundColor: "#0478A7",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  noData: { fontSize: 18, color: "#555", textAlign: "center", marginTop: 20 },
});
