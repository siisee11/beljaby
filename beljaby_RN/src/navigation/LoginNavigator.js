
import React from 'react'

import { createStackNavigator, HeaderBackground } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import IDSearchScreen from '../screens/SearchScreen/IDSearchScreen'
import IDResultScreen from '../screens/SearchScreen/IDResultScreen'
import PWSearchScreen from '../screens/SearchScreen/PWSearchScreen'
import NewPWScreen from '../screens/SearchScreen/NewPWScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ConnectScreen from '../screens/ConnectScreen'
import CompleteScreen from '../screens/RegisterScreen/CompleteScreen'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator()

const LoginNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="IDSearch" component={IDSearchScreen} />
            <Stack.Screen name="IDResult" component={IDResultScreen} />
            <Stack.Screen name="PWSearch" component={PWSearchScreen} />
            <Stack.Screen name="NewPW" component={NewPWScreen} />
        </Stack.Navigator>
    )
}

export default LoginNavigation