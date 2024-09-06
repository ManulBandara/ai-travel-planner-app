import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router';

export default function login() { 

  const router=useRouter();
  return (
    <View>
      <Image
        source={require("./../assets/images/airobo2.jpg")}
        style={{
          width: "100%",
          height: 520,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          AI Travel Planner
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            textAlign: "center",
            fontSize: 17,
            color: Colors.GRAY,
            marginTop: 20,
          }}
        >
          Step into a world of adventure with AI insights tailored to your
          unique journey!
        </Text>

        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/sign-in')}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.WHITE,
    marginTop:-20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:'100%',
    padding:25,
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderRadius:99,
    marginTop:'20%',

  }
})
