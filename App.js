import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from './screens/Splash'
import Screenslogin from './screens/Screenslogin'
import Screensregister from './screens/Screensregister'
import Screensmenu from './screens/Screensmenu'
import Screensbmi from './screens/Screensbmi'
import Screensbmr from './screens/Screensbmr'
import Screenstypemuscle from './screens/Screenstypemuscle'
import MuscleCreate from './screens/MuscleCreate'
import ProfileScreen from './screens/ProfileScreen'
import ScreenbmiHistory from './screens/ScreenbmiHistory'
import MuscleCreateDetail from './screens/MuscleCreateDetail'
import BookmarkList from './screens/BookmarkList'


const Stack = createStackNavigator();

function Mystack() {
  return (
      <Stack.Navigator
        initialRouteName="Splash"
      >
        <Stack.Screen 
          name="Splash"
          component={Splash}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screenslogin"
          component={Screenslogin}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screensregister"
          component={Screensregister}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screensmenu"
          component={Screensmenu}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screensbmi"
          component={Screensbmi}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screensbmr"
          component={Screensbmr}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Screenstypemuscle"
          component={Screenstypemuscle}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="MuscleCreate"
          component={MuscleCreate}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ScreenbmiHistory"
          component={ScreenbmiHistory}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="MuscleCreateDetail"
          component={MuscleCreateDetail}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="BookmarkList"
          component={BookmarkList}
          options={{headerShown:false}}
        />
        
        

      </Stack.Navigator>

  )
}


export default function App(){
  return(
  <NavigationContainer>
    <Mystack/>
  </NavigationContainer>
  );
  
}


