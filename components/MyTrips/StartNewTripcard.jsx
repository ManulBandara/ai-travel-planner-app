import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Add a subtle pulse animation to the button
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc", "#50c9c3"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Ionicons name="location-sharp" size={60} color="#ff6f61" />
        <Text style={styles.title}>No trips planned yet</Text>

        <Text style={styles.subtitle}>
          Looks like you haven't planned any trips yet. Start planning now!
        </Text>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            onPress={() => router.push("/create-trip/select-act")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start New Trip</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 28,
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#0478A7",
    borderRadius: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
});
