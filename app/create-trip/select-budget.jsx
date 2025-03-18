import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors } from "./../../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function SelectBudget() {
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleNext = async () => {
    if (!selectedBudget) {
      alert("Please select a budget option.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated!");
      return;
    }

    const userPreferencesRef = doc(db, "preferences", user.uid);

    try {
      const docSnap = await getDoc(userPreferencesRef);

      if (docSnap.exists()) {
        await updateDoc(userPreferencesRef, {
          budget: selectedBudget,
        });
      } else {
        await setDoc(userPreferencesRef, {
          budget: selectedBudget,
          startDate: "", // Placeholder, as dates may be set later
          endDate: "",
          preferences: [],
        });
      }

      console.log("Budget selection saved:", selectedBudget);
      router.push("/create-trip/recommendations");
    } catch (error) {
      console.error("Error updating budget selection:", error);
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#F5F5F5"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={30} color={Colors.DARK} />
      </TouchableOpacity>

      <Text style={styles.header}>Select Your Budget</Text>

      <View style={styles.cardContainer}>
        {[
          { id: "cheap", title: "Budget", color: "#E3F2FD" },
          { id: "moderate", title: "Moderate", color: "#FFECB3" },
          { id: "luxury", title: "Luxury", color: "#F8BBD0" },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: item.color },
              selectedBudget === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedBudget(item.id)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
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

      <TouchableOpacity
        style={[styles.nextButton, !selectedBudget && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedBudget}
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
    fontSize: 28,
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 30,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  cardTitle: {
    fontSize: 20,
    color: Colors.DARK,
  },
  checkIcon: {
    marginLeft: 10,
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
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
});
