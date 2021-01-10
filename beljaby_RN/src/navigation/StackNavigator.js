import React from 'react'

import { createStackNavigator, HeaderBackground } from '@react-navigation/stack'
import StartScreen from '../screens/StartScreen'
// import LoginNavigator from './LoginNavigator'
// import RegisterNavigator from './RegisterNavigator'
// import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: true}}>
            <Stack.Screen name="Start" component={StartScreen} />
            {/* <Stack.Screen name="Login" component={LoginNavigator} />
            <Stack.Screen name="Register" component={RegisterNavigator} headerShown={true}/>
            <Stack.Screen name="Main" component={BottomTabNavigator}/> */}
        </Stack.Navigator>
    )
}

export default StackNavigation