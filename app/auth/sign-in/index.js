import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  // Initialize state variables with empty strings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Sign-In function
  const onSignIn = () => {
    if (!email || !password) {  // Check if either field is empty
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // Signed in
        const user = userCredential.user;
        router.replace('/mytrip');
        console.log(user);
 // Navigate to a different screen after successful sign- // Replace '/home' with your desired screen
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage,error.code)
        if(errorCode=='auth/invalid-credential')
          {
            ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
          }// Display error message as an alert
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Let's Sign You In</Text>

      <Text style={styles.subTitle}>Welcome Back</Text>
      <Text style={styles.subTitle}>You've been missed!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* Sign-In Button */}
      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginTop: 30,
  },
  subTitle: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.GRAY,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    fontFamily: 'outfit',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    fontFamily: 'outfit',
  },
  signInButton: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  createAccountButton: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  createAccountText: {
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
});
