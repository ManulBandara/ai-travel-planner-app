import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router"; // Import useRouter for navigation
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectTravelerList } from "./../../constants/Options"; // Options for travelers

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter(); // Initialize router for navigation
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerBackVisible: true, // Ensures back button is visible
    });
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log("Selected Option: ", option.label);
  };

  const handleNextButtonPress = () => {
    if (selectedOption) {
      // Navigate to the next screen
      router.push("/create-trip/select-dates"); // Change the route as per your structure
    } else {
      alert("Please select a travel option");
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 35, marginBottom: 10 }}
      >
        Who's Traveling
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
          color: "#777",
          marginBottom: 20,
        }}
      >
        Choose your travelers
      </Text>
      <FlatList
        data={SelectTravelerList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OptionCard
            option={item}
            isSelected={selectedOption === item}
            onSelect={() => handleSelectOption(item)}
          />
        )}
      />

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNextButtonPress} // Call the function on button press
        style={{
          padding: 15,
          backgroundColor: selectedOption ? Colors.PRIMARY : "#d3d3d3",
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
        }}
        disabled={!selectedOption} // Disable button if no option is selected
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// OptionCard Component
function OptionCard({ option, isSelected, onSelect }) {
  const iconColor = isSelected ? getSelectedColor(option.label) : "#888";

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: isSelected ? "#e6f7ff" : "#fff",
        borderRadius: 10,
        marginBottom: 15,
        borderColor: "#ddd",
        borderWidth: 1,
      }}
    >
      <Ionicons name={option.icon} size={30} color={iconColor} />
      <View style={{ marginLeft: 20 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
            color: isSelected ? getSelectedColor(option.label) : "#333",
          }}
        >
          {option.label}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-light",
            fontSize: 14,
            color: "#888",
            marginTop: 5,
          }}
        >
          {option.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Function to get a unique color based on the label
function getSelectedColor(label) {
  switch (label) {
    case "Just Me":
      return "#FF8C00"; // Orange for Just Me
    case "A Couple":
      return "#FF1493"; // Pink for Couple
    case "Family":
      return "#32CD32"; // Green for Family
    case "Friends":
      return "#1E90FF"; // Blue for Friends
    default:
      return "#888";
  }z
}
