// Sign Up Page

import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  },[])
  return (
    <View style={{
      padding: 25,
      paddingTop: 50,
      backgroundColor: Colors.WHITE,
      height: '100%',
    
    }}>
      <TouchableOpacity onPress={()=> router.back()}>
      <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{
        fontFamily: "outfit-bold",
        fontSize: 30,
        marginTop: 30,
      }}>Create New Account</Text>

      <View style={{
        marginTop: 50
     }}>
        <Text style={{
          fontFamily: "outfit",
        }}>Full Name</Text>
        <TextInput 
          style={styles.input}
        placeholder='Enter Full Name' />
     </View>

      <View style={{
        marginTop: 20
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

     <View style={{
      padding:20,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 15,
      marginTop: 50
     }}>
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
          }}>Create Account</Text>
     </View>

     <TouchableOpacity 
      onPress={()=> router.replace('auth/sign-in')}
       
      style={{
      padding:20,
      backgroundColor: Colors.WHITE,
      borderRadius: 15,
      marginTop: 20,
      borderWidth: 1,
     }}>
          <Text style={{
            color: Colors.PRIMARY,
            textAlign: 'center',
          }}>Sign In</Text>
     </TouchableOpacity>

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
