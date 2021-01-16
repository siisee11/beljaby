import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './StackNavigator'
// import BottomTabNavigator from './BottomTabNavigator'

const Navigation = () => {
  return (
    <NavigationContainer>
        {/* <BottomTabNavigator /> */}
        <StackNavigator />
    </NavigationContainer>
  )
}

export default Navigation