import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Colors } from "./../../constants/Colors";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../../configs/FirebaseConfig.js"; // Firebase import
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function SelectDates() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setSelectedDates({
        [day.dateString]: {
          selected: true,
          startingDay: true,
          color: Colors.PRIMARY,
        },
      });
    } else {
      setEndDate(day.dateString);
      const range = getDateRange(startDate, day.dateString);
      setSelectedDates(range);
    }
  };

  const getDateRange = (start, end) => {
    const range = {};
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      range[dateString] = {
        selected: true,
        color: Colors.PRIMARY,
        textColor: Colors.WHITE,
      };
      if (dateString === start) {
        range[dateString].startingDay = true;
      }
      if (dateString === end) {
        range[dateString].endingDay = true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return range;
  };

  const handleNext = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
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
        // Update the document with travel dates
        await updateDoc(userPreferencesRef, {
          startDate: startDate,
          endDate: endDate,
        });
      } else {
        // Create new document if it doesn't exist
        await setDoc(userPreferencesRef, {
          startDate: startDate,
          endDate: endDate,
          preferences: [],
        });
      }

      console.log("Travel dates saved:", startDate, endDate);
      router.push("/create-trip/select-budget");
    } catch (error) {
      console.error("Error updating travel dates:", error);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>Select Travel Dates</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={selectedDates}
          markingType="period"
          theme={{
            selectedDayBackgroundColor: Colors.PRIMARY,
            todayTextColor: Colors.PRIMARY,
            arrowColor: Colors.PRIMARY,
            textDayFontFamily: "outfit-medium",
            textMonthFontFamily: "outfit-bold",
            textDayHeaderFontFamily: "outfit-medium",
          }}
        />
      </View>

      {startDate && endDate && (
        <View style={styles.selectedDatesContainer}>
          <MaterialIcons name="date-range" size={24} color={Colors.PRIMARY} />
          <Text style={styles.selectedDatesText}>
            {startDate} to {endDate}
          </Text>
        </View>
      )}

      <Text style={styles.instructions}>
        Choose your travel dates to start planning your trip.
      </Text>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
        <MaterialIcons name="arrow-forward" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </Animated.View>
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
    fontSize: 32,
    textAlign: "center",
    color: Colors.DARK,
    marginBottom: 20,
    letterSpacing: 1,
  },
  calendarContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  selectedDatesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  selectedDatesText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: Colors.DARK,
    marginLeft: 10,
  },
  instructions: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  nextButton: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  nextButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 18,
    marginRight: 10,
  },
});
