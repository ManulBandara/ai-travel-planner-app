import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../../constants/Colors';
import { useNavigation } from 'expo-router'

export default function SignUp() {
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  },[])
  return (
    <View style={{
      padding: 25,
      paddingTop: 50,
    
    }}>
      <Text style={{
        fontFamily: "outfit-bold",
        fontSize: 30,
      }}>Create New Account</Text>

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
     <View style={{
        marginTop: 20
     }}>
        <Text style={{
          fontFamily: "outfit",
        }}>Password</Text>
        <TextInput 
          secureTextEntry={true}
          style={styles.input}
        placeholder='Enter Password' />
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
  },
})
