import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'

export default function Splash({navigation}){

  const Screenslogin = () => {
    navigation.navigate('Screenslogin');
  }

  return (
    <Pressable onPress={Screenslogin}>

    <View style={{height: "100%", alignItems: "center", backgroundColor: "#355682"}}>
      <View style={{ flex: 0.95, justifyContent: "center"}}>
        <Image source={require('../img/Logo_project.jpg')} style={{ width: 350, height: 100}} />
      </View>
      <View style={{ flex: 0.05}}>
        <Text style={{ color: "white"}}>Presented by RTE.co</Text>
      </View>
    </View>
    </Pressable>
  )
}

