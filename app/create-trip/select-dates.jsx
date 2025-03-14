import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function SelectDates() {
  const router = useRouter(); // Hook for navigation

  // Function to handle "Next" button click
  const handleNext = () => {
    // Navigate to the next page (adjust path as needed)
    router.push("/create-trip/select-budget");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Select Travel Dates</Text>

      {/* Calendar Placeholder */}
      <View style={styles.calendarContainer}>
        <Ionicons name="calendar-outline" size={60} color={Colors.PRIMARY} />
        <Text style={styles.calendarPlaceholderText}>
          Calendar will be displayed here
        </Text>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Choose your travel dates to start planning your trip.
      </Text>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 40,
  },
  calendarContainer: {
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.PRIMARY_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  calendarPlaceholderText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "#888",
    marginTop: 15,
  },
  instructions: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
  nextButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 40,
  },
  nextButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
});
