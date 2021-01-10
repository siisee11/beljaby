import React from 'react'
import { Text, Header, TouchableOpacity, StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'

import CalendarScreen from '../screens/CalendarScreen'
import CalendarListScreen from '../screens/CalendarScreen/CalendarListScreen'
import AgendaScreen from '../screens/CalendarScreen/AgendaScreen'
import AgendaTest from '../screens/CalendarScreen/test'
import ExpandableScreen from '../screens/CalendarScreen/ExpandableCalendarScreen'
import StackScreen from './StackNavigator'
import Tickets from '../Components/Tickets'

const Tab = createMaterialBottomTabNavigator() //createBottomTabNavigator()

const BottomTabNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                tabStyle: {
                    backgroundColor: '#000',
                },
                activeTintColor: '#fff',
            }}>

            {/* <Tab.Screen
                name={"LoginStack"}
                component={StackScreen}
                options={{
                    // tabBarIcon: ({ color }) => (
                    //     <Feather name={'calendar'} size={25} color={color} />
                    // )
                }} /> */}
            <Tab.Screen
                name={"Calendar List"}
                // component={CalendarListScreen}
                component={ExpandableScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name={'calendar'} size={25} color={color} />
                    )
                }} />
            <Tab.Screen
                name={"Agenda"}
                component={AgendaTest}
                options={{
                    // tabBarIcon: ({ color }) => (
                    //     <MaterialCommunityIcons name={'run-fast'} size={25} color={color} />
                    // ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
