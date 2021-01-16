
import React from 'react'

import { createStackNavigator, HeaderBackground } from '@react-navigation/stack'
import CalendarScreen from '../screens/CalendarScreen'
import AgendaScreen from '../screens/CalendarScreen/AgendaScreen'
import LoginScreen from '../screens/LoginScreen'
import EntranceScreen from '../screens/RegisterScreen/EntranceScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ConnectScreen from '../screens/ConnectScreen'
import CompleteScreen from '../screens/RegisterScreen/CompleteScreen'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator()

const RegisterNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Entrance" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Entrance" component={EntranceScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Connect" component={ConnectScreen} />
            <Stack.Screen name="Complete" component={CompleteScreen} />
            {/* <Stack.Screen name="Main" component={BottomTabNavigator}/> */}
        </Stack.Navigator>
    )
}

export default RegisterNavigation