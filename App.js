import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './screens/Splash'
import Screenslogin from './screens/Screenslogin'
import Screensregister from './screens/Screensregister'
import Screensmenu from './screens/Screensmenu'
import Screensbmi from './screens/Screensbmi'
import Screensbmr from './screens/Screensbmr'
import Screenstypemuscle from './screens/Screenstypemuscle'
import Screensshowoutput from './screens/Screensshowoutput'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Screensshowoutput />
  )
}

export default App