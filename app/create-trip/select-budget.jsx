import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Colors } from "./../../constants/Colors"; // Adjust the path if needed
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { LinearGradient } from "expo-linear-gradient"; // For gradient backgrounds

export default function SelectBudget() {
  const router = useRouter(); // Initialize the router
  const [selectedBudget, setSelectedBudget] = useState(null);
  const scaleValue = new Animated.Value(1); // For card selection animation

  // Function to handle "Next" button click and navigate to next page
  const handleNext = () => {
    if (selectedBudget) {
      router.push("/create-trip/recommendations"); // Change the route as per your structure
    }
  };

  // Function to animate card selection
  const animateSelection = () => {
    Animated.spring(scaleValue, {
      toValue: 1.02,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#F5F5F5"]} style={styles.container}>
      {/* Backward Icon at the top-left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        accessibilityLabel="Go back"
      >
        <Icon name="arrow-back" size={30} color={Colors.DARK} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Your Budget</Text>

      {/* Budget Options */}
      <View style={styles.cardContainer}>
        {[
          {
            id: "cheap",
            title: "Budget",
            desc: "Stay conscious of costs",
            color: "#E3F2FD",
            img: "https://cdn-icons-png.flaticon.com/512/10060/10060033.png",
          },
          {
            id: "moderate",
            title: "Moderate",
            desc: "Balance cost and comfort",
            color: "#FFECB3",
            img: "https://static.vecteezy.com/system/resources/thumbnails/007/129/641/small/financial-cost-budget-icon-vector.jpg",
          },
          {
            id: "luxury",
            title: "Luxury",
            desc: "Enjoy premium experiences",
            color: "#F8BBD0",
            img: "https://www.svgrepo.com/show/236425/jewels-luxury.svg",
          },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: item.color },
              selectedBudget === item.id && styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedBudget(item.id);
              animateSelection();
            }}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Select ${item.title} budget`}
          >
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.desc}</Text>
            </View>
            {selectedBudget === item.id && (
              <Icon
                name="check-circle"
                size={24}
                color={Colors.SUCCESS}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button with Navigation */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedBudget && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedBudget}
        accessibilityRole="button"
        accessibilityLabel="Continue to next step"
      >
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 28,
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: 120,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    gap: 20,
    overflow: "hidden",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    transform: [{ scale: 1.02 }],
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.DARK,
  },
  cardDescription: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: "#555",
  },
  checkIcon: {
    position: "absolute",
    right: 20,
  },
  nextButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    width: "80%",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
