// Sign Up Page

import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import { useState } from 'react';

export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFulName]=useState();
  

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  },[]);


  const OnCreateAccount=()=>{

    if(!email&&!password&&!fullName)
    {
      ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
      return ;
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip');

    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });
  }

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
        placeholder='Enter Full Name'
        onChangeText={(value)=>setFulName(value)}
        />
     </View>

      <View style={{
        marginTop: 20
     }}>
        <Text style={{
          fontFamily: "outfit",
        }}>Email</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(value)=>setEmail(value)}
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
          onChangeText={(value)=>setPassword(value)}
        placeholder='Enter Password' />
     </View>


{/* Sign in button */}
     <TouchableOpacity onPress={OnCreateAccount} style={{
      padding:20,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 15,
      marginTop: 50
     }}>
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
          }}>Create Account</Text>
      </TouchableOpacity>
     

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
