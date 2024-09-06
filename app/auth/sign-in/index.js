import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../../constants/Colors';

export default function SignIn() {
  const navigation=useNavigation();
  
  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  },[])
  return (
    <View style={{
      padding: 25,
      paddingTop: 80,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
     <Text style={{
      fontFamily: "outfit-bold",
      fontSize: 30,
     }}>Let's Sign You In</Text>

      <Text style={{
      fontFamily: "outfit",
      fontSize: 30,
      color:Colors.Gray,
      marginTop: 20
     }}>Welcome Back</Text>

      <Text style={{
      fontFamily: "outfit",
      fontSize: 30,
      color:Colors.Gray,
      marginTop: 10
     }}>You've been missed!</Text>

     <View style={{
        marginTop: 50
     }}>
        <Text style={{
          fontFamily: "outfit",
        }}>Email</Text>
        <TextInput 
          style={styles.input}
        placeholder='Enter Email' />
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
   
  }
})
