import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth';

export default function Splash({navigation}){


  const isloading = () => {
    setTimeout(() => {
      isLoggedIn();
    }, 3000);
  }


  const isLoggedIn = async() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in');
        
        navigation.navigate('Screensmenu');
      } else {
        console.log('User is not signed in');
        // alert('User is not signed in');
        navigation.navigate('Screenslogin');
      }
    });
  }

  useEffect(() => {
    isloading();
    
  }, [])
  


  return (    

    
    <View style={{height: "100%", alignItems: "center", backgroundColor: "#355682"}}>
      <View style={{ flex: 0.95, justifyContent: "center"}}>
        <Image source={require('../img/Logo_project.jpg')} style={{ width: 350, height: 100}} />
      </View>
      <View style={{ flex: 0.05}}>
        <Text style={{ color: "white"}}>Presented by RTE.co</Text>
      </View>
    </View>
   
  )
}

