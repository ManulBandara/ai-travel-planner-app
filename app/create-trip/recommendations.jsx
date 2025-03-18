import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
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
      <Text style={styles.header}>🌍 Recommended Destinations</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ImageBackground
                source={{ uri: "https://source.unsplash.com/400x300/?travel" }}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>{item.Destination} 🏝️</Text>
                  <Text style={styles.details}>📍 {item.Category}</Text>
                  <Text style={styles.details}>💰 Budget: ${item.Budget}</Text>
                  <Text style={styles.details}>
                    ⏳ Duration: {item.Duration}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>❌ No recommendations found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#ecf0f1",
    marginTop: 5,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
});
