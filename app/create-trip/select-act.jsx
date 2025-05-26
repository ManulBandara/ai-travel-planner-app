import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig.js"; // Import Firebase config
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function SelectPreference() {
  const router = useRouter();
  const [preference, setPreference] = useState("");
  const [preferencesList, setPreferencesList] = useState([]);
  const exampleActivities = ["Safari", "Hiking", "Beach", "Camping", "Diving"];
  const scaleValue = new Animated.Value(1);

  const handleAddPreference = () => {
    if (preference && !preferencesList.includes(preference)) {
      setPreferencesList([...preferencesList, preference]);
      setPreference("");
      animateButton();
    }
  };

  const handleRemovePreference = (item) => {
    setPreferencesList(preferencesList.filter((pref) => pref !== item));
  };

  const handleNext = async () => {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    if (user && preferencesList.length > 0) {
      try {
        // Reference to Firestore document
        const userPreferencesRef = doc(collection(db, "preferences"), user.uid);

        // Store preferences in Firestore
        await setDoc(userPreferencesRef, {
          preferences: preferencesList,
          timestamp: new Date(),
        });

        console.log("Preferences saved successfully for user:", user.uid);
        router.push("/create-trip/search-place");
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Your Preferred Activities</Text>

      {/* Input and Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your preference..."
          placeholderTextColor="#777"
          value={preference}
          onChangeText={setPreference}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPreference}
        >
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Icon name="add" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Added Preferences List */}
      <FlatList
        data={preferencesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item}</Text>
            <TouchableOpacity
              onPress={() => handleRemovePreference(item)}
              style={styles.deleteButton}
            >
              <Icon name="close" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        style={styles.listContainer}
      />

      {/* Example Activities */}
      <Text style={styles.examplesHeader}>Popular Activities</Text>
      <FlatList
        data={exampleActivities}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exampleItem}
            onPress={() => setPreference(item)}
          >
            <Text style={styles.exampleText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.exampleContainer}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          preferencesList.length === 0 && styles.disabledButton,
        ]}
        onPress={handleNext}
        disabled={preferencesList.length === 0}
      >
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 20,
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#0478A7",
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  listContainer: {
    width: "100%",
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    marginVertical: 5,
    elevation: 3,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    padding: 5,
  },
  examplesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },
  exampleContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  exampleItem: {
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    marginHorizontal: 5,
    elevation: 3,
  },
  exampleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  nextButton: {
    padding: 15,
    backgroundColor: "#0478A7",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 1,
    padding: 10,
    borderRadius: 50,
  },
});
