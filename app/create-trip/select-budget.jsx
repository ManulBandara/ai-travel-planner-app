import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
        await updateDoc(userPreferencesRef, { budget: selectedBudget });
      } else {
        await setDoc(userPreferencesRef, {
          budget: selectedBudget,
          startDate: "",
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
          { id: "cheap", title: "Budget", color: "#D1FAE5" },
          { id: "moderate", title: "Moderate", color: "#FDE68A" },
          { id: "luxury", title: "Luxury", color: "#FBCFE8" },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: item.color },
              selectedBudget === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedBudget(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {selectedBudget === item.id && (
              <Icon
                name="check-circle"
                size={26}
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
        activeOpacity={0.8}
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 140,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: Colors.PRIMARY,
    shadowOpacity: 0.3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.DARK,
  },
  checkIcon: {
    marginLeft: 10,
  },
  nextButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextButtonText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 0,
    padding: 10,
  },
});
