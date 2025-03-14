import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors } from "./../../constants/Colors"; // Adjust the path if needed
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { useRouter } from "expo-router"; // Import useRouter from expo-router

export default function SelectBudget() {
  const router = useRouter(); // Initialize the router

  // Function to handle "Next" button click and navigate to next page
  const handleNext = () => {
    // Redirect to the "select-activity" page
    router.push("/create-trip/select-act"); // Change the route as per your structure
  };

  return (
    <View style={styles.container}>
      {/* Backward Icon at the top-left */}
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={30} color={Colors.DARK} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Your Budget</Text>

      {/* Budget Options */}
      <View style={styles.cardContainer}>
        {/* Normal Budget */}
        <TouchableOpacity style={[styles.card, styles.normalCard]}>
          <Image
            source={{
              uri: "https://example.com/normal-budget-image.jpg", // Replace with an actual image URL
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Normal</Text>
          <Text style={styles.cardDescription}>Affordable options</Text>
        </TouchableOpacity>

        {/* Moderate Budget */}
        <TouchableOpacity style={[styles.card, styles.moderateCard]}>
          <Image
            source={{
              uri: "https://example.com/moderate-budget-image.jpg", // Replace with an actual image URL
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Moderate</Text>
          <Text style={styles.cardDescription}>Comfort and convenience</Text>
        </TouchableOpacity>

        {/* Expensive Budget */}
        <TouchableOpacity style={[styles.card, styles.expensiveCard]}>
          <Image
            source={{
              uri: "https://example.com/expensive-budget-image.jpg", // Replace with an actual image URL
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Expensive</Text>
          <Text style={styles.cardDescription}>Luxury</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button with Navigation */}
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
    alignItems: "center", // Center align the cards and content
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 32,
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 40,
  },
  cardContainer: {
    flexDirection: "row", // Align cards horizontally
    justifyContent: "space-between", // Space the cards evenly
    width: "100%",
    marginTop: 30,
  },
  card: {
    width: "30%", // Make each card take 30% of the screen width
    height: 280, // Adjust the height to make it look more balanced
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden", // Prevents image from spilling over the border radius
    transition: "all 0.3s ease-in-out", // Smooth transition on hover/tap
  },
  normalCard: {
    backgroundColor: "#B2EBF2", // Light blue for normal budget
  },
  moderateCard: {
    backgroundColor: "#FFE0B2", // Light orange for moderate budget
  },
  expensiveCard: {
    backgroundColor: "#FFEBEE", // Light pink for expensive budget
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Round the image to make it look more appealing
    marginBottom: 15,
  },
  cardTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.DARK,
    textAlign: "center",
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  nextButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 40,
    width: "80%",
  },
  nextButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 40, // Position the back button at the top-left
    left: 20,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
