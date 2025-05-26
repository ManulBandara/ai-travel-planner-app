import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SelectTravelerList } from "./../../constants/Options";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../configs/FirebaseConfig.js"; // Import Firebase config
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerBackVisible: true,
    });
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log("Selected Option: ", option.label);

    // Animate button
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNextButtonPress = async () => {
    if (!selectedOption) {
      alert("Please select a travel option");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated!");
      return;
    }

    const userPreferencesRef = doc(db, "preferences", user.uid);

    try {
      // Fetch existing user data
      const docSnap = await getDoc(userPreferencesRef);

      if (docSnap.exists()) {
        // Update the document with the traveler option
        await updateDoc(userPreferencesRef, {
          traveler: selectedOption.label,
        });
      } else {
        // If no preferences exist, create a new document
        await setDoc(userPreferencesRef, {
          traveler: selectedOption.label,
          preferences: [], // Ensure preferences is an array
        });
      }

      console.log("Traveler selection saved:", selectedOption.label);
      router.push("/create-trip/select-dates");
    } catch (error) {
      console.error("Error updating traveler selection:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginBottom: 10,
          color: "#333", // Darker title color
        }}
      >
        Who's Traveling
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
          color: "#0478A7",
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
            scaleValue={scaleValue}
          />
        )}
      />

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNextButtonPress}
        style={{
          padding: 15,
          backgroundColor: selectedOption ? Colors.PRIMARY : "#d3d3d3",
          borderRadius: 30, // Smoother corner
          marginTop: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
        disabled={!selectedOption}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// OptionCard Component
function OptionCard({ option, isSelected, onSelect, scaleValue }) {
  const iconColor = isSelected ? getSelectedColor(option.label) : "#888";
  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onSelect}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 18,
          paddingHorizontal: 25,
          backgroundColor: isSelected ? "#e6f7ff" : "#fff",
          borderRadius: 20, // Round corners
          marginBottom: 20,
          borderColor: "#ddd",
          borderWidth: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 4,
        }}
      >
        <LinearGradient
          colors={isSelected ? ["#FF8C00", "#FF1493"] : ["#888", "#888"]}
          style={{
            padding: 12,
            borderRadius: 12, // Rounded gradient
          }}
        >
          <Ionicons name={option.icon} size={32} color="#fff" />
        </LinearGradient>
        <View style={{ marginLeft: 20 }}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
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
    </Animated.View>
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
  }
}
